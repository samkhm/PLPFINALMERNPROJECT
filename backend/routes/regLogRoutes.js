const express = require("express");
const { signup, login, getAllUsers} = require("../controllers/authUserController");
const router = express.Router();
const { protect, authorize} = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", protect, authorize(["admin"]), getAllUsers);

module.exports = router;