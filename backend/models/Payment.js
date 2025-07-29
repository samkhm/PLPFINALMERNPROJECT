const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    phone: {type: Number, required: true},
    transaction_id: {type: String, required: true, unique: true},
    amount: {type: Number, required: true},
    transaction_date: { type: Date, required: true}

}, {
    timestamps: true
});

module.exports = mongoose.model("Payments", paymentSchema);