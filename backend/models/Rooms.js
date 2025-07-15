const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    availability: { type: Boolean, default: true },
    booked: { type: Boolean, default: false },
    pending:{ type: Bolean, default: false}
});

module.exports = mongoose.model("Room", roomSchema);