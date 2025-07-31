const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    phone: {type: Number, required: true},
    roomNumber: String,
    transaction_id: { type: String, default: null, sparse: true, // This is key
                                        unique: true},
    amount: {type: Number, required: true},
    transaction_date: { type: Date },
    checkoutRequestID: {type: String, unique: true},
    status: String

}, {
    timestamps: true
});

module.exports = mongoose.model("Payments", paymentSchema);