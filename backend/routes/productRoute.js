const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const ProductController = require("../controller/productController");
const authMiddleware= require("../middlewares/authMiddleware");
const ReviewController = require("../controller/reviewController");
const authValidation = require('../middlewares/validations/authValidation')
const productValidation = require("../middlewares/validations/productValidation")

// Route to create a new product
/*router.post("/create", authMiddleware.verifyToken, authMiddleware.verifyAdmin,
     productValidation.createProductValidation, authValidation.validate,
     upload.single('image'), ProductController.createProduct);*/

     router.post("/create", authMiddleware.verifyToken, authMiddleware.verifyAdmin,
    
     upload.single('image'), ProductController.createProduct)

//route to delete a product
 router.delete("/delete/:id", authMiddleware.verifyToken, authMiddleware.verifyAdmin, ProductController.deleteProduct);

 //route to get get product
 router.get("/get-products", ProductController.getProducts);

//route to get product by id
router.get("/get-product/:id",authMiddleware.optionalAuth, ProductController.getProductById);

//route to update a product
router.put("/update/:id", authMiddleware.verifyToken, authMiddleware.verifyAdmin, 
    productValidation.updateProductValidation, authValidation.validate,
     upload.single('image'), ProductController.updateProduct);

//route to create a review
router.post( "/:id/review", authMiddleware.verifyToken, ReviewController.createReview );

module.exports = router;