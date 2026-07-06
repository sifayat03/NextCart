const Cart = require("../models/cartModel")
const Product = require('../models/productModel')


const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Product Id is required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({
            userId: req.user._id
        });

        if (!cart) {
            cart = new Cart({
                userId: req.user._id,
                items: []
            });
        }

        const existingProduct = cart.items.find(
            item =>
                item.productId.toString() ===
                productId
        );

        if (existingProduct) {
            existingProduct.quantity +=
                quantity || 1;
        } else {
            cart.items.push({
                productId,
                quantity: quantity || 1
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


 const getCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            userId: req.user._id
        }).populate("items.productId");

        if (!cart) {
            return res.status(200).json({
                items: []
            });
        }

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const removeFromCart = async ( req, res ) => {

    try {

        const { productId } = req.params;

        const cart = await Cart.findOne({
            userId: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item =>
                item.productId.toString() !==
                productId
        );

        await cart.save();

        res.status(200).json({
            message: "Item removed"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      userId: req.user._id,
    }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId._id.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const product = cart.items[itemIndex].productId;

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`,
      });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId: req.user._id,
    }).populate("items.productId");

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      items: updatedCart.items,
    });
  } catch (error) {
    console.error("Update cart quantity error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {addToCart, removeFromCart, getCart, updateCartItemQuantity };