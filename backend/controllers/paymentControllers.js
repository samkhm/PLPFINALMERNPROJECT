const Payment = require("../models/Payment");
const axios = require("axios");
const User = require("../models/User");
const BookedRooms = require("../models/BookedRooms");
const Rooms = require("../models/Rooms");

exports.makePayment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.phone) {
      return res.status(404).json({ error: "User not found or missing phone number" });
    }

    // Format phone number
    let phone = user.phone;
    if (phone.startsWith("0")) {
      phone = "254" + phone.slice(1);
    }

    // Validate Safaricom number
    if (!/^254[17]\d{8}$/.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }


    const booking = await BookedRooms.findById(req.params.id);
    if (!booking || !booking.price) {
      return res.status(404).json({ error: "Booking not found or missing price" });
    }

    const amount = booking.price;

    // Prepare STK push request
    const date = new Date();
    const timestamp =
      date.getFullYear().toString() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    const shortcode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;
    const accNum = process.env.ACC_NUMBER;
    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: `Room ${booking.roomNumber}`,
      TransactionDesc: `Payment for ${booking.roomNumber}`,
    };
    
 
    const { data } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPayload,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
        timeout: 10000, // Optional: Set 10s timeout to handle slow Safaricom servers
      }
    );

  //  console.log("M-Pesa STK Push Response:", data);


    if (data.ResponseCode === "0") {
      // Payment initiated successfully
      //store CheckoutRequestId and roomNumber in DB
      await Payment.create({
        phone,
        amount,
        roomNumber: booking.roomNumber,
        checkoutRequestID: data.CheckoutRequestID,
        status: "pending",
      });
      
      return res.status(200).json({
        status: "initiated",
        message: data.CustomerMessage,
        merchantRequestID: data.MerchantRequestID,
        checkoutRequestID: data.CheckoutRequestID,
        phone,
        amount,
      }
   
    );
      
    } else {
      // M-Pesa rejected the STK push (rare)
      return res.status(400).json({
        status: "rejected",
        message: data.ResponseDescription || "Payment request rejected by M-Pesa",
      });
    }
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      // Axios timeout
      return res.status(504).json({ status: "timeout", message: "STK push request timed out" });
      
    }

    const safError = err.response?.data || {};
    const message =
      safError.errorMessage ||
      safError.ResponseDescription ||
      err.message ||
      "Unknown error during STK push";

    return res.status(500).json({ status: "failed", message });
  }
};


exports.callbackHandler = async (req, res) => {

  console.log("📥 M-Pesa Callback Received:", JSON.stringify(req.body, null, 2));
  

  const callback = req.body?.Body?.stkCallback;
  const metadata = callback?.CallbackMetadata;
  const items = metadata?.Item;

  if (!items || !callback.CheckoutRequestID) {
    console.warn("⚠️ Missing metadata or Items array:", callback?.Body);
    return res.status(200).json({ message: "Callback received!: missing data" });
  }

  const checkoutRequestID = callback.CheckoutRequestID;

  const amount = items.find(i => i.Name === "Amount")?.Value;
  const transaction_id = items.find(i => i.Name === "MpesaReceiptNumber")?.Value;
  const transaction_date = items.find(i => i.Name === "TransactionDate")?.Value;
  const phoneNumberRaw = items.find(i => i.Name === "PhoneNumber")?.Value;
 
  if (!amount || !transaction_id || !phoneNumberRaw || !transaction_date) {
    console.warn("⚠️ Incomplete transaction data");
    return res.status(200).json({ message: "Incomplete data received" });
  }

  const parsedDate = new Date(
    transaction_date.toString().replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3T$4:$5:$6Z')
  );

  console.log("✅ Parsed Transaction Details:", { amount, transaction_id, phoneNumberRaw, parsedDate});



  try {
    const existingPayment = await Payment.findOne({ transaction_id });
    if (existingPayment) {
      console.info("ℹ️ Duplicate transaction:", transaction_id);
      return res.status(200).json({ message: "Duplicate transaction" });
    }

    //find pending payment using CheckoutID
    const pendingPayment = await Payment.findOne({ checkoutRequestID });
    if(!pendingPayment){
      console.warn("No matching payment");
      return res.status(200).json({ message: "No matching pending payment"});
    }

    // update payment
    pendingPayment.status = "completed";
    pendingPayment.transaction_date = parsedDate;
    pendingPayment.transaction_id = transaction_id;
    await pendingPayment.save();

   //update room booking
const bookingRecord = await BookedRooms.findOneAndUpdate(
      { roomNumber: pendingPayment.roomNumber },
      { payment: true, pending: false },
      {new: true}
    );

    if(!bookingRecord){
      console.warn("⚠️ Booking not found for room:", pendingPayment.roomNumber);
      return res.status(404).json({ message: "Booking not found" })
    }

    return res.status(200).json({ message: "Payment saved and booking updated" });

  } catch (error) {
    console.error("❌ Database error:", error.message);
    return res.status(500).json({ message: "Database error" });
  }
};


