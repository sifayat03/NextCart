import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar} from "./component/Navbar";
import { Footer } from './component/Footer';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Disclaimer } from './pages/Disclaimer';
import {Home} from './pages/Home';
import { RegisterPage } from './pages/RegisterPage';
import { VerifyOtp } from './pages/Verify-otp';
import { Login } from './pages/LoginPage';
import { OrderSuccess } from './pages/OrderSuccess';
import { MyOrders } from './pages/MyOrders';
import { ProductDetail } from './pages/ProductDetail';
import { Profile } from './pages/Profile';
import { Wishlist } from './pages/Wishlist';
import { ReturnPolicy } from './pages/ReturnPolicy';
import { Shop } from './pages/Shop';
import { AddProducts } from './admin/AddProduct';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminOrders } from './admin/AdminOrders';
import { AdminProducts } from './admin/AdminProducts';
import { AdminUsers } from './admin/AdminUsers'; 
import { EditProducts } from './admin/EditProducts';

function App() {
  return (
    <Router>
    <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="verify-otp" element={<VerifyOtp />}/>


          <Route path="/login" element={<Login />} />
          <Route path="/profile"  element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />}/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path='/order-success' element={<OrderSuccess />} />





          <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProducts />} />
         <Route path="/admin/products" element={<AdminProducts />} />
         <Route path="/admin/products/edit/:id" element={<EditProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
           <Route path="/admin/users" element={<AdminUsers />} />
           
          
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;