const Room = require("../models/Rooms");
const BookedRooms = require("../models/BookedRooms");

//api/rooms
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, ...rest } = req.body;

    if (!roomNumber) {
      return res.status(400).json({ message: "Room number is required" });
    }

    const roomExist = await Room.findOne({ roomNumber });
    if (roomExist) {
      return res.status(409).json({ message: "Room already exists" });
    }

    const room = await Room.create({
      roomNumber,
      ...rest      
    });

    return res.status(201).json(room);

  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



//api/rooms/getAllrooms
exports.getAllrooms = async (req, res) =>{
    const rooms = await Room.find();
    res.json(rooms);
};

//api/bookedroom
// POST /rooms/book/:id
exports.bookRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.booked) {
      return res.status(400).json({ message: "Room is already booked" });
    }

    // Update room status
    room.booked = true;
    await room.save();

    // Create booked room record
    const bookedRoom = await BookedRooms.create({
      room_id: room._id,
      owner: req.user.id,
      roomNumber: room.roomNumber,
      location: room.location,
      availability: !room.availability,
      booked: room.booked,
      pending: !room.pending,
      payment: room.payment,
      price: room.price,
    });

    res.status(201).json({ message: "Room booked successfully", room, bookedRoom });

  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//api/rooms/getAllbookedRooms
exports.getAllBookedRooms = async (req, res) => {
    const bookedRooms = await BookedRooms.find().populate("owner", "firstName email");
    res.json(bookedRooms);
};


//api/rooms/me
exports.getMyRoom = async (req, res) =>{
    const myroom = await BookedRooms.find({ owner: req.user.id});
    res.json(myroom);
};

//api/rooms/:id

exports.updateRoom = async (req, res) =>{
    try {

        const room = await Room.findById(req.params.id);
        if(!room){
            return res.status(404).json({ message: "No room found"});
        };
   
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        res.json(updatedRoom);

        
    } catch (error) {
        console.log("Faild to update", error);
    }
};

//api/rooms/updateBooked room

exports.updateBookedRoom = async (req, res) =>{
    try {

        const room = await BookedRooms.findById(req.params.id);
        
        if(!room){
            return res.status(404).json({ message: "Room not found"});
        };

        const updatedbookedroom = await Subject.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
           );

           res.json(updatedbookedroom);

        
    } catch (error) {
        res.status(400).json({ message: error.message});
        
    }
};


//api/room/deleterooms
exports.deleteRooms = async (req, res) =>{
    try {
        const room = await Room.findById(req.params.id);
        if(!room) return res.status(404).json({ message: "Room not found"});

        if(room.owner.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({ message: "You cant delete a room"});
        };

        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "Room deleted"});
        
    } catch (error) {
        res.status(400).json({ message: error.message});
        
    }
}

exports.deleteBookedRoom = async (req, res) => {
  try {
    const bookedRoom = await BookedRooms.findById(req.params.id);
    if (!bookedRoom) {
      return res.status(404).json({ message: "Booked room not found" });
    }

    const room = await Room.findById(bookedRoom.room_id);
    if (room) {
      room.booked = false;
      availability = true;
      pending = false;
      await room.save();
    }

    await BookedRooms.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Room booking cancelled successfully" });

  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
