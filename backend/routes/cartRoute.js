const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const authMiddleware= require("../middlewares/authmiddleware");


router.post(
    "/add",
    authMiddleware.verifyToken,
    cartController.addToCart
);

router.get(
    "/",
    authMiddleware.verifyToken,
    cartController.getCart
);

router.delete(
    "/:productId",
    authMiddleware.verifyToken,
    cartController.removeFromCart
);

router.put(
  "/:productId",
  authMiddleware.verifyToken,
  cartController.updateCartItemQuantity
);

module.exports = router;