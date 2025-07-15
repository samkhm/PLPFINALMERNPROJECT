const mongoose = require("mongoose");

const bookedRoomSchema = new mongoose.Schema({
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roomNumber: { type: String, required: true },
          
    price: { type: Number, required: true },
    status: { type: String, default: "available" },
    
});
module.exports = mongoose.model("BookedRoom", bookedRoomSchema);