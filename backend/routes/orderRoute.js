const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");
const authMiddleware= require("../middlewares/authmiddleware");

// Route to create a new order
router.post("/create", authMiddleware.verifyToken, OrderController.createOrder);

// Route to get orders of logged in user
router.get("/my-orders", authMiddleware.verifyToken, OrderController.getMyOrders);

// Admin route to get all orders
router.get("/all", authMiddleware.verifyToken, authMiddleware.verifyAdmin, OrderController.getAllOrders);

// Admin route to update order status
router.put("/update-status/:orderId", authMiddleware.verifyToken, authMiddleware.verifyAdmin, OrderController.updateOrderStatus);

module.exports = router;