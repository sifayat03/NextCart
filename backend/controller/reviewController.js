const Product = require("../models/productModel");
const Order = require('../models/orderModel');

const createReview = async (req, res) => {
    try{
        const { rating, comment } = req.body;

    const productId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required",
      });
    }

    // Product exists?

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Purchased & Delivered?

    const hasPurchased = await Order.findOne({
      userId: req.user._id,
      status: "Delivered",
      "items.productId": productId,
    });

    if (!hasPurchased) {
      return res.status(400).json({
        success: false,
        message:
          "You can review only products you have purchased and received",
      });
    }

    // Already reviewed?

    const existingReview = product.reviews.find(
      (review) =>
        review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      // Update existing review

      existingReview.rating = Number(rating);
      existingReview.comment = comment;
    } else {
      // Add new review

      product.reviews.push({
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      });
    }

    // Recalculate ratings

    product.numReviews = product.reviews.length;

    product.averageRating =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: existingReview
        ? "Review updated successfully"
        : "Review added successfully",
      product,
    });

    }catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
 createReview
};

