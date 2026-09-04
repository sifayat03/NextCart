require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');




connectDB();

const app = express();
app.use(cookieParser());


app.use(express.json());  

app.use(
  cors({
    origin: "https://nextcart-psmr.onrender.com/", // frontend URL
    credentials: true,
  })
);

    

     app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });

  //routes
  const authRoutes = require('./routes/authRoute');
  const productRoutes = require('./routes/productRoute');
  const orderRoutes = require('./routes/orderRoute');
  const cartRoutes = require('./routes/cartRoute');
  const adminRoutes = require('./routes/adminRoute');
  const paymentRoutes = require('./routes/paymentRoute');
  



  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/cart', cartRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/payment", paymentRoutes);
  



  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
