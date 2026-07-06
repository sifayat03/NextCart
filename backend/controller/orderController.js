const Order = require('../models/orderModel');
const emailService = require('../service/emailService');
const Product = require('../models/productModel.js')
const Cart = require('../models/cartModel.js')


 const createOrder = async (req, res) => {
  try {
   

    const { items, address, paymentId, paymentMethod, razorpayOrderId, razorpayPaymentId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    if (!address.fullName ||
  !address.street ||
  !address.city ||
  !address.postalCode ||
  !address.country) {
      return res.status(400).json({
        message: "All address fields are required",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `${product.name} has only ${product.stock} items left`,
        });
      }

      totalAmount += product.price * item.qty;

      orderItems.push({
        productId: product._id,
        name: product.name,
        image: product.imageUrl,
        qty: item.qty,
        price: product.price,
      });

      // Reduce stock
      product.stock -= item.qty;
      await product.save();
    }

    const orderNumber = `ORD-${Date.now()}`;

    const order = await Order.create({
  orderNumber,
  userId: req.user._id,
  items: orderItems,
  totalAmount,
  address,
  paymentId,
  paymentMethod: paymentMethod || "COD",
  paymentStatus:  paymentMethod === "Razorpay" ? "Paid"  : "Pending",
  razorpayOrderId,
  razorpayPaymentId,
  status: "Pending",
});

    await Cart.findOneAndUpdate(
  { userId: req.user._id },
  { items: [] }
);

    await emailService.sendOrderConfirmation(
      req.user.email,
      order
    );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

   



  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

/*const createOrder = async (req, res) => {
    try {
         const { items, totalAmount, address, paymentId } = req.body;

         if(!items || !totalAmount || !address) {
            return res.status(400).json({ message: 'Missing required fields' });
         }

         if(items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
         }

         const order = new Order({
            userId: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
         });
            const savedOrder = await order.save();

            // Send order confirmation email
            await emailService.sendOrderConfirmation(req.user.email, savedOrder);

            res.status(201).json({ message: 'Order created successfully', order: savedOrder });

    }catch (error) {
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
}*/

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
}

 const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;    
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        await order.save();
        res.status(200).json({
      success: true,
      message: "Status updated",
      order
    });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    } 
}  


module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus

}