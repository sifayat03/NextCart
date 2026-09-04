const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinary");
const Order = require('../models/orderModel');


// Create a new product
const createProduct = async (req, res) => {
    try{
        const { name, description, price, category, stock } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: "nextcart-products",
            public_id: `${Date.now()}_${name}`
        });

        console.log("Cloudinary upload result:", uploadResult);

        const product =  await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl: uploadResult.secure_url,
            imagePublicId: uploadResult.public_id
        });
        res.status(201).json({ message: "Product created successfully", product });

    }catch(error){
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;

        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(product.imagePublicId);
        // Delete product from database
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
}
 const getProducts = async (req, res) => {
  try {

    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        },
        {
          category: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    // Price Filter
    if (minPrice || maxPrice) {

      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }

    }

    let productsQuery = Product.find(query);

    // Sorting
    if (sort === "low-high") {

      productsQuery = productsQuery.sort({
        price: 1
      });

    } else if (sort === "high-low") {

      productsQuery = productsQuery.sort({
        price: -1
      });

    }

   

    const products = await productsQuery;

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getProductById = async (req, res) => {
    try {
       const { id } = req.params;
       
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let canReview = false;

    if (req.user) {

      const purchased =
        await Order.findOne({
          userId: req.user._id,
          status: "Delivered",
          "items.productId": id,
        });

      canReview = !!purchased;
    }

    res.status(200).json({
      product,
      canReview,
    });
    } catch (error) {
  console.log("GET PRODUCT ERROR:", error);

  res.status(500).json({
    message: error.message
  });

    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Update product fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        // If a new image is uploaded, handle the upload and update the image URL and public ID
        if (req.file) {
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            // Upload new image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(base64Image, {
                folder: "nextcart-products",
                public_id: `${Date.now()}_${name}`
            });
            // Delete old image from Cloudinary
            await cloudinary.uploader.destroy(product.imagePublicId);
            // Update product with new image URL and public ID
            product.imageUrl = uploadResult.secure_url;
            product.imagePublicId = uploadResult.public_id;
        }
        await product.save();
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
}

module.exports = {createProduct, deleteProduct, getProducts, getProductById, updateProduct };