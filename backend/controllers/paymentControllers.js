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
    if (!/^2547\d{8}$/.test(phone)) {
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
      AccountReference: accNum,
      TransactionDesc: `Payment for room ${booking.roomNumber}`,
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
  console.log("Sending M-Pesa STK Push with callback:", CallBackURL);

  const callbackData = req.body;
  const metadata = callbackData?.Body?.stkCallback?.CallbackMetadata;
  const items = metadata?.Item;

  if (!items) {
    console.warn("⚠️ Missing metadata or Items array:", callbackData?.Body);
    return res.status(200).json({ message: "Callback received!: missing metadata" });
  }

  const amount = items.find(i => i.Name === "Amount")?.Value;
  const transaction_id = items.find(i => i.Name === "MpesaReceiptNumber")?.Value;
  const transaction_date = items.find(i => i.Name === "TransactionDate")?.Value;
  const phoneNumber = items.find(i => i.Name === "PhoneNumber")?.Value;
 

  const parsedDate = new Date(
    transaction_date.toString().replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3T$4:$5:$6Z')
  );

  console.log("✅ Parsed Transaction Details:", { amount, transaction_id, phoneNumber, parsedDate});

  if (!amount || !transaction_id || !phoneNumber || !transaction_date) {
    console.warn("⚠️ Incomplete transaction data");
    return res.status(200).json({ message: "Incomplete data received" });
  }

  try {
    const existingPayment = await Payment.findOne({ transaction_id });
    if (existingPayment) {
      console.info("ℹ️ Duplicate transaction:", transaction_id);
      return res.status(200).json({ message: "Duplicate transaction" });
    }

    const payment = new Payment({
      
      phone: phoneNumber,
      amount,
      transaction_date: parsedDate,
      transaction_id
    });

    const savedPayment = await payment.save();
    // console.log("✅ Payment saved:", savedPayment);

    await BookedRooms.findOneAndUpdate(
      { phoneNumber: phoneNumber, payment: false },
      { payment: true, pending: false }
    );

    return res.status(200).json({ message: "Payment saved and booking updated" });

  } catch (error) {
    console.error("❌ Database error:", error.message);
    return res.status(500).json({ message: "Database error" });
  }
};


