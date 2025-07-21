const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    location: { type: String},
    availability: { type: Boolean, default: true },
    booked: { type: Boolean, default: false },
    pending:{ type: Boolean, default: false},
    payment:{ type: Boolean, default: false},
   });

module.exports = mongoose.model("Room", roomSchema);