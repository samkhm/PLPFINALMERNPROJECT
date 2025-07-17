const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    location: { type: String},
    availability: { type: Boolean, default: true },
    booked: { type: Boolean, default: false },
    pending:{ type: Boolean, default: false},
    owner:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true}
    
});

module.exports = mongoose.model("Room", roomSchema);