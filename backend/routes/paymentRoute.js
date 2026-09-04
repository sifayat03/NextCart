const express = require("express");
const router = express.Router();
const authMiddleware= require("../middlewares/authMiddleware");

const paymentController = require("../controller/paymentController");

router.post("/create-order", paymentController.createOrder);
router.post( "/verify", paymentController.verifyPayment);

module.exports = router;