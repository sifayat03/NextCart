const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailService = require("../service/emailService");
const Order = require('../models/orderModel');
const Product = require('../models/productModel.js')

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const registerUser = async (req, res) => {
try {


const { name, email, password } = req.body;

if (!name || !email || !password) {
  return res.status(400).json({
    message: "Please provide all required fields",
  });
}

const userExists = await User.findOne({ email });

const generateOtp = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

// CASE 1: User already verified
if (userExists && userExists.isVerified) {
  return res.status(400).json({
    message: "User already exists",
  });
}

// CASE 2: User exists but not verified
if (userExists && !userExists.isVerified) {

  userExists.otp = generateOtp();
  userExists.otpExpires =
    Date.now() + 10 * 60 * 1000;

  await userExists.save();

  await emailService.sendWelcomeOtpEmail(
    userExists.email,
    userExists.name,
    userExists.otp
  );

  return res.status(200).json({
    message: "OTP resent successfully",
    email: userExists.email,
  });
}

// CASE 3: New User

const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(
  password,
  salt
);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  isVerified: false,
  otp: generateOtp(),
  otpExpires:
    Date.now() + 10 * 60 * 1000,
});

await emailService.sendWelcomeOtpEmail(
  user.email,
  user.name,
  user.otp
);

return res.status(201).json({
  message: "OTP sent successfully",
  email: user.email,
});


} catch (error) {


console.error(error);

return res.status(500).json({
  message: "Registration failed",
  error: error.message,
});


}
};



const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
 
  const isOtpValid = user.otp === otp && user.otpExpires > Date.now();

  if (!isOtpValid) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  user.isVerified = true;

  user.otp = null;
  user.otpExpires = null;

const token = generateToken(user._id);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});

 await user.save();

res.json({
  message: "OTP verified successfully",
  token
});


}
0
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const user = await User.findOne({ email });

  if (!user.isVerified) {
  return res.status(401).json({
    message: "Please verify your email first"
  });
}

  if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      // saving token in cookie before sending response
        
          res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
}

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getProfile = async (req, res) => {
  try {

    const user = req.user;

    const totalOrders = await Order.countDocuments({
      userId: user._id,
    });

    let totalReviews = 0;

    const reviewedProducts = await Product.find({
      "reviews.user": user._id,
    });

    reviewedProducts.forEach((product) => {

      totalReviews += product.reviews.filter(
        (review) =>
          review.user.toString() ===
          user._id.toString()
      ).length;

    });

    const wishlistCount =  user.wishlist.length;

    res.status(200).json({
      success: true,
      user,
      totalOrders,
      totalReviews,
      wishlistCount
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const toggleWishlist = async (req, res) => {
  try {

    const { productId } = req.params;

    const user = req.user;

    const exists = user.wishlist.includes(productId);

    if (exists) {

      user.wishlist = user.wishlist.filter(
        id => id.toString() !== productId
      );

      await user.save();

      return res.status(200).json({
    success: true,
    isWishlisted: false,
    message: "Removed from wishlist",
  });

      
    }

    user.wishlist.push(productId);

    await user.save();

  res.status(200).json({
  success: true,
  isWishlisted: true,
  message: "Added to wishlist",
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

 const getWishlist = async (req, res) => {
  try {

    const user = await User.findById(
      req.user._id
    ).populate("wishlist");

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

 
module.exports = {
  registerUser,
  verifyOtp,
  loginUser,
  getAllUsers,
  getProfile,
  toggleWishlist,
  getWishlist
};