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


module.exports = {addToCart, removeFromCart, getCart };