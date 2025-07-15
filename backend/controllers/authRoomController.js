const Room = require("../models/Rooms");
const BookedRooms = require("../models/BookedRooms");

//api/rooms
exports.createRoom = async (req, res) =>{
    const room = await Room.create( {...req.body, owner: req.user.id});
    res.json(room);
};

//api/rooms/getAllrooms
exports.getAllrooms = async (req, res) =>{
    const rooms = await Room.find({ owner: req.user.id});
    res.json(rooms);
};

//api/bookedroom
exports.createBookedRoom = async (req, res) =>{
    try {
        const room = await Room.findById(req.params.id);
        if(!room) return res.status(404).json({ message: "Room not Found"});
        if(room.booked || room.pending || !availability) return res.status(400).json({ message: "Room is already booked"});
        
        if(room.owner.toString() === req.user.id) return res.status(400).json({ message: "You can't book your own room"});
         
        const bookedRoom = await BookedRooms.create({ room_id: room._id, owner: req.user.id, rooNumber: room.roomNumber, price: room.price});
        res.json(bookedRoom);
                
    } catch (error) {
        console.log("Error booking room", error);
        
    }
}
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
   
        if(room.owner.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(401).json({ message : "You can't update"});
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
     
        if(room.owner.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(404).json({ message: "You can't update the room"});
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