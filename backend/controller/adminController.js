const Order = require('../models/orderModel');
const Product = require("../models/productModel");
const User = require("../models/user");

 const getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const recentOrders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};