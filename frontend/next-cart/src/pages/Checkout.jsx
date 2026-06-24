import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";



export const Checkout = () => {

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: ""
  });

  const buyNowItems =
  location.state?.items || [];

  const isBuyNow =
  buyNowItems.length > 0;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          withCredentials: true
        }
      );

      setCart(res.data.items);

    } catch (error) {
      console.log(error);
    }
  };

 const totalAmount = isBuyNow ? buyNowItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    )
  : cart.reduce(
      (total, item) =>
        total +
        item.productId.price *
          item.quantity,
      0
    );

  const handleChange = (e) => {

    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });

  };


const createOrder = async (
  paymentData = null
) => {

  const orderItems = isBuyNow
  ? buyNowItems.map(item => ({
      productId: item.productId,
      qty: item.quantity,
    }))
  : cart.map(item => ({
      productId: item.productId._id,
      qty: item.quantity,
    }));

  const res = await axios.post(

    
    "http://localhost:5000/api/orders/create",
    {
      items: orderItems,
      address,

      paymentId:
        paymentData?.razorpay_payment_id,

      razorpayOrderId:
        paymentData?.razorpay_order_id,

      razorpayPaymentId:
        paymentData?.razorpay_payment_id,

      paymentMethod:
        paymentData
          ? "Razorpay"
          : "COD",
    },
    {
      withCredentials: true
    }
  );

  return res.data;
};

  const placeOrder = async () => {

    try {

      setLoading(true);

     await createOrder();

    alert("Order placed");

    navigate("/order-success");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to place order"
      );

    } finally {

      setLoading(false);

    }
  };

  const handlePayment = async () => {

  try {

    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: totalAmount
      },
      {
        withCredentials: true
      }
    );

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: data.amount,

      currency: data.currency,

      name: "NextCart",

      description: "Order Payment",

      order_id: data.id,

      prefill: { name: user?.name, email: user?.email, },
      
      handler: async function(response) {

  try {

    const verifyRes = await axios.post(
      "http://localhost:5000/api/payment/verify",
      response,
      {
        withCredentials: true,
      }
    );

    console.log(verifyRes.data);

    alert("Payment Verified 🎉");
    await createOrder(response);

alert(
  "Payment Successful & Order Created 🎉"
);

navigate("/order-success");

  } catch (error) {

    console.log(error);

  }

},



      

      

      theme: {
        color: "#3399cc"
      }

    };

    
console.log("option",options);



    const razorpay = new window.Razorpay(options);

razorpay.on("payment.failed", function (response) {
  console.log("PAYMENT FAILED");
  console.log(response.error);
});

razorpay.open();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Address */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Shipping Address
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={address.fullName}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

          </div>

        </div>

        {/* Order Summary */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cart.map(item => (

              <div
                key={item.productId._id}
                className="flex justify-between"
              >
                <span>
                  {item.productId.name}
                  {" "}
                  x
                  {" "}
                  {item.quantity}
                </span>

                <span>
                  ₹
                  {item.productId.price *
                    item.quantity}
                </span>

              </div>

            ))}

          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span>
              ₹{totalAmount}
            </span>

          </div>

    <button onClick={handlePayment}>
  Pay Now
</button>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg"
          >
            {
              loading
                ? "Placing Order..."
                : "Place Order"
            }
          </button>

        </div>

      </div>

    </div>
  );
};

