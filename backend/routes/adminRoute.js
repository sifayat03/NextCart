const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");
const authMiddleware= require("../middlewares/authMiddleware");


router.get(
  "/dashboard",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  adminController.getDashboardStats
);

module.exports = router;