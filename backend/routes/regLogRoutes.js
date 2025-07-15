const express = require("express");
const { signup, login} = require("../controllers/authUserController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);