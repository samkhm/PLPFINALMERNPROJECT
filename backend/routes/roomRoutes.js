const express = require("express");
const { protect, authorize} = require("../middleware/auth");
const { createRoom, bookRoom, getAllrooms, getAllBookedRooms, getMyRoom, deleteBookedRoom, updateRoom, updateBookedRoom, deleteRooms} = require("../controllers/authRoomController");
const router = express.Router();

router.post("/", protect, authorize(["admin"]), createRoom);
router.post("/bookRoom/:id", protect, bookRoom);
router.get("/all", protect, getAllrooms);
router.get("/allbookedRooms", protect, authorize(["admin"]), getAllBookedRooms);
router.get("/getMyRoom", protect, getMyRoom);
router.put("/:id", protect, updateRoom);
router.put("/updateBookedRoom/:id", protect, updateBookedRoom);
router.delete("/:id", protect, authorize(["admin"]), deleteRooms);
router.delete("/deleteBookedRoom/:id", protect, deleteBookedRoom);

module.exports = router;