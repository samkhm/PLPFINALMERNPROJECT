const express = require("express");
const router = express.Router();
const {makePayment, callbackHandler} = require("../controllers/paymentControllers");
const {generateToken, protect} = require("../middleware/auth");

router.post("/makepayment/:id", generateToken, protect, makePayment);
router.post("/callback", callbackHandler);


module.exports = router;