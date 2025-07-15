const express = require("express");
const { protect, authorize} = require("../middleware/auth");
const { createRoom, getAllrooms, getAllBookedRooms, getMyRoom, updateRoom, updateBookedRoom, deleteRooms} = require("../controllers/authRoomController");
const router = express.Router();

router.post("/", protect, authorize(["admin"]), createRoom);
router.get("/getAllrooms", protect, getAllrooms);
router.get("/getAllbookedRooms", protect, authorize(["admin"]), getAllBookedRooms);
router.get("/me", protect, getMyRoom);
router.put("/:id", protect, authorize(["admin"]), updateRoom);
router.put("/updateBookedRoom/:id", protect, updateBookedRoom);
router.delete("/:id", protect, authorize(["admin"]), deleteRooms);
