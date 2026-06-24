const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authMiddleware= require("../middlewares/authmiddleware");
const authValidation = require('../middlewares/validations/authValidation')


router.post("/register", authValidation.registerValidation, authValidation.validate, authController.registerUser);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authValidation.loginValidation, authValidation.validate, authController.loginUser);
router.get('/users', authMiddleware.verifyToken, authMiddleware.verifyAdmin, authController.getAllUsers);
router.get("/profile", authMiddleware.verifyToken, authController.getProfile);

//wishlist
router.get("/wishlist", authMiddleware.verifyToken , authController.getWishlist);
router.post( "/wishlist/:productId", authMiddleware.verifyToken, authController.toggleWishlist );


module.exports = router;