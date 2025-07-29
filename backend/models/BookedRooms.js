const mongoose = require("mongoose");

const bookedRoomSchema = new mongoose.Schema({
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String},
    availability: { type: Boolean, default: true },
    booked: { type: Boolean, default: false },
    pending:{ type: Boolean, default: false},
    payment:{ type: Boolean, default: false},
    roomNumber: { type: String, required: true },
    phoneNumber: {type: Number, required: true}, 
    price: { type: Number, required: true },
    status: { type: String, default: "available" },
    
});
module.exports = mongoose.model("BookedRoom", bookedRoomSchema);