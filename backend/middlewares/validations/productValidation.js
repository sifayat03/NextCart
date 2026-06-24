const { body } = require("express-validator");



const createProductValidation = [

body("name")
.trim()
.notEmpty()
.withMessage("Product name is required")
.isLength({ min: 3, max: 100 })
.withMessage(
"Product name must be between 3 and 100 characters"
),

body("description")
.trim()
.notEmpty()
.withMessage("Description is required")
.isLength({ min: 10 })
.withMessage(
"Description must be at least 10 characters"
),

body("price")
.notEmpty()
.withMessage("Price is required")
.isFloat({ min: 1 })
.withMessage(
"Price must be greater than 0"
),

body("stock")
.notEmpty()
.withMessage("Stock is required")
.isInt({ min: 0 })
.withMessage(
"Stock cannot be negative"
),

body("category")
  .isIn([
    "Electronics",
    "Fashion",
    "Books",
    "Shoes"
  ])
  .withMessage("Invalid category"),

body("imageUrl")
.trim()
.notEmpty()
.withMessage("Image URL is required")
.isURL()
.withMessage("Please provide a valid image URL")

];



const updateProductValidation = [

body("name")
.optional()
.trim()
.isLength({ min: 3, max: 100 })
.withMessage(
"Product name must be between 3 and 100 characters"
),

body("description")
.optional()
.trim()
.isLength({ min: 10 })
.withMessage(
"Description must be at least 10 characters"
),

body("price")
.optional()
.isFloat({ min: 1 })
.withMessage(
"Price must be greater than 0"
),

body("stock")
.optional()
.isInt({ min: 0 })
.withMessage(
"Stock cannot be negative"
),

body("category")
.optional()
.trim(),

body("imageUrl")
.optional()
.isURL()
.withMessage(
"Please provide a valid image URL"
)

];




module.exports = {
createProductValidation,
updateProductValidation
};
