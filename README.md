# NextCart

A production-ready full-stack e-commerce application built with React, Vite, Express, and MongoDB. NextCart delivers a complete shopping experience with secure authentication, product management, cart workflows, order processing, and admin controls.

## Key Technologies

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB with Mongoose
- Authentication: JWT, HTTP-only cookies, OTP verification
- Payments: Razorpay
- Image storage: Cloudinary

## Repository Layout

- `backend/`
  - `index.js` — server bootstrap and route registration
  - `config/` — MongoDB and Cloudinary configuration
  - `controller/` — API handler logic
  - `middlewares/` — auth, validation, and file handling middleware
  - `models/` — Mongoose schemas and data models
  - `routes/` — REST API endpoints
  - `service/` — helper services such as email delivery
- `frontend/next-cart/`
  - `src/` — React application source code
  - `src/pages/` — route-level pages
  - `src/component/` — UI components and shared widgets
  - `src/context/` — state providers for auth and wishlist
  - `src/redux/` — centralized state management

## Core Features

- OTP-based user registration and verification
- JWT-based login with secure cookie storage
- Product catalog with search, filtering, and sorting
- Wishlist and cart management
- Order placement and admin-driven order status updates
- Cloudinary-backed product image uploads
- Razorpay order creation and payment verification
- Admin dashboard with platform metrics

## Quickstart

### Backend setup

```bash
cd backend
npm install
```

Create `backend/.env` with the following values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email_address
EMAIL_PASSWORD=your_email_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start the backend server:

```bash
npm run dev
```

### Frontend setup

```bash
cd frontend/next-cart
npm install
npm run dev
```

Access the frontend at `http://localhost:5173`.

## API Endpoints

Base URL: `http://localhost:5000/api`

### Auth Routes

#### `POST /api/auth/register`
- Description: Register a new user and send a verification OTP email.
- Auth: none
- Request body:
```json
{
  "name": "Sahil",
  "email": "sahil@example.com",
  "password": "SuperSecret123"
}
```
- Success response:
```json
{
  "message": "OTP sent successfully",
  "email": "sahil@example.com"
}
```
- Notes: If the email exists and user is unverified, it resends OTP instead.

#### `POST /api/auth/verify-otp`
- Description: Verify the OTP and activate the user account.
- Auth: none
- Request body:
```json
{
  "email": "sahil@example.com",
  "otp": "123456"
}
```
- Success response:
```json
{
  "message": "OTP verified successfully",
  "token": "<jwt_token_here>"
}
```
- Notes: This also sets an HTTP-only `token` cookie.

#### `POST /api/auth/login`
- Description: Login a verified user with email and password.
- Auth: none
- Request body:
```json
{
  "email": "sahil@example.com",
  "password": "SuperSecret123"
}
```
- Success response:
```json
{
  "_id": "64b1b7d3...",
  "name": "Sahil",
  "email": "sahil@example.com",
  "role": "user",
  "token": "<jwt_token_here>"
}
```
- Notes: Requires `isVerified` to be true. The response also includes a cookie.

#### `GET /api/auth/users`
- Description: Fetch all registered users.
- Auth: JWT cookie or header + admin role
- Example request header:
  - `Authorization: Bearer <token>`
- Success response:
```json
{
  "success": true,
  "users": [
    {
      "_id": "64b1b7d3...",
      "name": "Sahil",
      "email": "sahil@example.com",
      "role": "user"
    }
  ]
}
```

#### `GET /api/auth/profile`
- Description: Get the current authenticated user profile.
- Auth: JWT cookie or header
- Success response:
```json
{
  "success": true,
  "user": {
    "_id": "64b1b7d3...",
    "name": "Sahil",
    "email": "sahil@example.com",
    "wishlist": []
  },
  "totalOrders": 2,
  "totalReviews": 1,
  "wishlistCount": 3
}
```

#### `GET /api/auth/wishlist`
- Description: Return the authenticated user’s wishlist products.
- Auth: JWT cookie or header
- Success response:
```json
{
  "success": true,
  "wishlist": [
    {
      "_id": "64b1c8a9...",
      "name": "Black T-Shirt",
      "price": 499,
      "category": "Clothing"
    }
  ]
}
```

#### `POST /api/auth/wishlist/:productId`
- Description: Toggle a product in the user’s wishlist.
- Auth: JWT cookie or header
- URL parameter:
  - `productId` - ID of the product to add or remove
- Success response when added:
```json
{
  "success": true,
  "isWishlisted": true,
  "message": "Added to wishlist"
}
```
- Success response when removed:
```json
{
  "success": true,
  "isWishlisted": false,
  "message": "Removed from wishlist"
}
```

### Product Routes

#### `POST /api/products/create`
- Description: Create a new product.
- Auth: JWT cookie or header + admin role
- Request type: `multipart/form-data`
- Request fields:
  - `name` (string)
  - `description` (string)
  - `price` (number)
  - `category` (string)
  - `stock` (number)
  - `image` (file)
- Success response:
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "64b1d9f0...",
    "name": "Denim Jacket",
    "description": "Stylish denim jacket",
    "price": 1299,
    "category": "Jackets",
    "stock": 25,
    "imageUrl": "https://res.cloudinary.com/...",
    "imagePublicId": "nextcart-products/64b1d9f0..."
  }
}
```

#### `DELETE /api/products/delete/:id`
- Description: Delete a product and its Cloudinary image.
- Auth: JWT cookie or header + admin role
- URL parameter:
  - `id` - product ID
- Success response:
```json
{ "message": "Product deleted successfully" }
```

#### `GET /api/products/get-products`
- Description: Get products with optional search, filter, sorting.
- Query parameters:
  - `search` (string)
  - `category` (string)
  - `minPrice` (number)
  - `maxPrice` (number)
  - `sort` (`low-high` or `high-low`)
- Success response:
```json
{
  "success": true,
  "count": 2,
  "products": [
    {
      "_id": "64b1d9f0...",
      "name": "Denim Jacket",
      "price": 1299
    }
  ]
}
```

#### `GET /api/products/get-product/:id`
- Description: Get a single product by ID. If the user is authenticated, it also returns `canReview`.
- Auth: optional JWT cookie or header
- URL parameter:
  - `id` - product ID
- Success response:
```json
{
  "product": {
    "_id": "64b1d9f0...",
    "name": "Denim Jacket",
    "description": "Stylish denim jacket",
    "price": 1299,
    "stock": 25
  },
  "canReview": false
}
```

#### `PUT /api/products/update/:id`
- Description: Update a product and optionally replace its image.
- Auth: JWT cookie or header + admin role
- URL parameter:
  - `id` - product ID
- Request type: `multipart/form-data`
- Request fields: any of `name`, `description`, `price`, `category`, `stock`, optional `image`
- Success response:
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "64b1d9f0...",
    "name": "Denim Jacket Updated"
  }
}
```

#### `POST /api/products/:id/review`
- Description: Add a review to a product.
- Auth: JWT cookie or header
- URL parameter:
  - `id` - product ID
- Request body example:
```json
{
  "rating": 5,
  "comment": "Great jacket!"
}
```
- Success response depends on review creation flow and returns the saved review or updated product.

### Cart Routes

#### `POST /api/cart/add`
- Description: Add an item to the authenticated user’s cart.
- Auth: JWT cookie or header
- Request body:
```json
{
  "productId": "64b1d9f0...",
  "quantity": 2
}
```
- Success response:
```json
{
  "success": true,
  "message": "Product added to cart",
  "cart": {
    "userId": "64b1b7d3...",
    "items": [
      {
        "productId": "64b1d9f0...",
        "quantity": 2
      }
    ]
  }
}
```

#### `GET /api/cart`
- Description: Fetch the authenticated user’s cart.
- Auth: JWT cookie or header
- Success response:
```json
{
  "_id": "64b2a2f4...",
  "userId": "64b1b7d3...",
  "items": [
    {
      "productId": {
        "_id": "64b1d9f0...",
        "name": "Denim Jacket",
        "price": 1299
      },
      "quantity": 2
    }
  ]
}
```

#### `DELETE /api/cart/:productId`
- Description: Remove a product from the authenticated user’s cart.
- Auth: JWT cookie or header
- URL parameter:
  - `productId` - ID of product to remove
- Success response:
```json
{ "message": "Item removed" }
```

#### `PUT /api/cart/:productId`
- Description: Update the quantity of a cart item.
- Auth: JWT cookie or header
- URL parameter:
  - `productId` - ID of cart item product
- Request body:
```json
{
  "quantity": 3
}
```
- Success response:
```json
{
  "success": true,
  "message": "Cart quantity updated",
  "items": [
    {
      "productId": {
        "_id": "64b1d9f0...",
        "name": "Denim Jacket",
        "stock": 25
      },
      "quantity": 3
    }
  ]
}
```

### Order Routes

#### `POST /api/orders/create`
- Description: Create a new order from user-selected items.
- Auth: JWT cookie or header
- Request body:
```json
{
  "items": [
    {
      "productId": "64b1d9f0...",
      "qty": 2
    }
  ],
  "address": {
    "fullName": "Sahil",
    "street": "123 Main St",
    "city": "Mumbai",
    "postalCode": "400001",
    "country": "India"
  },
  "paymentId": "pay_ABC123",
  "paymentMethod": "Razorpay",
  "razorpayOrderId": "order_ABC123",
  "razorpayPaymentId": "pay_ABC123"
}
```
- Success response:
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "_id": "64b2b5e7...",
    "orderNumber": "ORD-...",
    "status": "Pending",
    "paymentStatus": "Paid"
  }
}
```
- Notes: Order creation validates address, checks stock, updates stock, and clears cart.

#### `GET /api/orders/my-orders`
- Description: Get orders placed by the authenticated user.
- Auth: JWT cookie or header
- Success response:
```json
{
  "orders": [
    {
      "_id": "64b2b5e7...",
      "orderNumber": "ORD-...",
      "totalAmount": 2598
    }
  ]
}
```

#### `GET /api/orders/all`
- Description: Admin-only endpoint to fetch every order.
- Auth: JWT cookie or header + admin role
- Success response:
```json
{
  "success": true,
  "orders": [
    {
      "_id": "64b2b5e7...",
      "userId": {
        "_id": "64b1b7d3...",
        "name": "Sahil",
        "email": "sahil@example.com"
      },
      "totalAmount": 2598
    }
  ]
}
```

#### `PUT /api/orders/update-status/:orderId`
- Description: Update the status of an existing order.
- Auth: JWT cookie or header + admin role
- URL parameter:
  - `orderId` - order document ID
- Request body:
```json
{
  "status": "Delivered"
}
```
- Success response:
```json
{
  "success": true,
  "message": "Status updated",
  "order": {
    "_id": "64b2b5e7...",
    "status": "Delivered"
  }
}
```

### Payment Routes

#### `POST /api/payment/create-order`
- Description: Create a Razorpay order object to start payment.
- Auth: none
- Request body:
```json
{
  "amount": 2598
}
```
- Success response:
```json
{
  "id": "order_ABC123",
  "amount": 259800,
  "currency": "INR",
  "status": "created"
}
```

#### `POST /api/payment/verify`
- Description: Verify Razorpay payment using signature validation.
- Auth: none
- Request body:
```json
{
  "razorpay_order_id": "order_ABC123",
  "razorpay_payment_id": "pay_ABC123",
  "razorpay_signature": "signature_value"
}
```
- Success response:
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

### Admin Routes

#### `GET /api/admin/dashboard`
- Description: Return admin dashboard statistics.
- Auth: JWT cookie or header + admin role
- Success response:
```json
{
  "totalProducts": 100,
  "totalUsers": 50,
  "totalOrders": 80,
  "totalRevenue": 120000,
  "recentOrders": [
    {
      "_id": "64b2b5e7...",
      "orderNumber": "ORD-...",
      "totalAmount": 2598
    }
  ]
}
```

## Program Flow

1. Visitors sign up using email and password.
2. The backend stores the user record with `isVerified: false`, issues an OTP, and sends it via email.
3. Users verify their account by submitting the OTP.
4. After verification, the app issues a JWT and stores it in a secure cookie.
5. Authenticated users can browse products, add items to wishlist/cart, and place orders.
6. Razorpay processes payments; the backend verifies payment signatures before finalizing orders.
7. Admin users manage products, orders, and view analytics through the admin dashboard.

## Notes

- Run backend and frontend concurrently for full functionality.
- The backend allows CORS requests from `http://localhost:5173`.
- Valid SMTP credentials are required for email delivery.
- Admin routes require a user with `role: admin`.

## License

This repository does not include a license.
