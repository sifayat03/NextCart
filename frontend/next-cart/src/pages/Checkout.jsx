import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Lock,
} from "lucide-react";

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
    country: "",
  });

  const validateAddress = () => {
  if (
    !address.fullName.trim() ||
    !address.street.trim() ||
    !address.city.trim() ||
    !address.postalCode.trim() ||
    !address.country.trim()
  ) {
    alert("Please fill in all shipping address fields");
    return false;
  }

  return true;
};

  const buyNowItems =
    location.state?.items || [];

  const isBuyNow =
    buyNowItems.length > 0;

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!isBuyNow) {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://nextcart-backend-kxc0.onrender.com/api/cart",
        {
          withCredentials: true,
        }
      );

      setCart(res.data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutItems = isBuyNow
    ? buyNowItems
    : cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
        name: item.productId.name,
        imageUrl: item.productId.imageUrl,
      }));

  const subtotal = checkoutItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const deliveryFee =
    checkoutItems.length > 0 ? 99 : 0;

  const totalAmount =
    subtotal + deliveryFee;

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const createOrder = async (
    paymentData = null
  ) => {
    const orderItems = isBuyNow
      ? buyNowItems.map((item) => ({
          productId: item.productId,
          qty: item.quantity,
        }))
      : cart.map((item) => ({
          productId: item.productId._id,
          qty: item.quantity,
        }));

    const res = await axios.post(
      "https://nextcart-backend-kxc0.onrender.com/api/orders/create",
      {
        items: orderItems,
        address,

        paymentId:
          paymentData?.razorpay_payment_id,

        razorpayOrderId:
          paymentData?.razorpay_order_id,

        razorpayPaymentId:
          paymentData?.razorpay_payment_id,

        paymentMethod: paymentData
          ? "Razorpay"
          : "COD",
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  };

  const placeOrder = async () => {
    try {
      if (!validateAddress()) return;
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
      if (!validateAddress()) return;
      setLoading(true);

      const { data } = await axios.post(
        "https://nextcart-backend-kxc0.onrender.com/api/payment/create-order",
        {
          amount: totalAmount,
        },
        {
          withCredentials: true,
        }
      );

      const options = {
        key: import.meta.env
          .VITE_RAZORPAY_KEY_ID,

        amount: data.amount,
        currency: data.currency,
        name: "NextCart",
        description: "Order Payment",
        order_id: data.id,

        prefill: {
          name: user?.name,
          email: user?.email,
        },

        handler: async function (
          response
        ) {
          try {
            const verifyRes =
              await axios.post(
                "https://nextcart-backend-kxc0.onrender.com/api/payment/verify",
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
          color: "#111111",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.log(
            "PAYMENT FAILED"
          );
          console.log(response.error);
        }
      );

      razorpay.open();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!checkoutItems.length) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-[32px] bg-white p-10 text-center shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">
            No checkout items found
          </h1>

          <p className="mt-3 text-gray-500">
            Please add products to cart or
            use Buy Now first.
          </p>

          <button
            onClick={() =>
              navigate("/cart")
            }
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-900"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Secure Checkout
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Complete your shipping and payment
            details
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <section className="rounded-[32px] bg-white p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                  <MapPin className="text-gray-700" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Shipping Address
                  </h2>
                  <p className="text-sm text-gray-500">
                    Enter the address where you
                    want your order delivered
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

                <InputField
                  label="Country"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                />

                <div className="md:col-span-2">
                  <InputField
                    label="Street Address"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                    placeholder="House no, street, area..."
                  />
                </div>

                <InputField
                  label="City"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />

                <InputField
                  label="Postal Code"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  placeholder="Enter postal code"
                />
              </div>
            </section>

            {/* Payment Info */}
            <section className="rounded-[32px] bg-white p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                  <CreditCard className="text-gray-700" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Payment Options
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choose your preferred payment
                    method
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[24px] border border-gray-200 bg-white p-5 transition hover:border-gray-300">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-700">
                      <Truck size={22} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Cash on Delivery
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Pay when your order is
                        delivered to your doorstep
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-gray-200 bg-white p-5 transition hover:border-gray-300">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-700">
                      <ShieldCheck size={22} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Razorpay Secure Payment
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Pay instantly using UPI,
                        cards, wallets, or net
                        banking
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="sticky top-24 rounded-[32px] bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              {/* Products */}
              <div className="mt-6 space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {checkoutItems.map(
                  (item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fafafa] p-3"
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>

                        <p className="mt-2 text-lg font-bold text-gray-900">
                          ₹
                          {item.price *
                            item.quantity}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Price breakdown */}
              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-gray-900">
                    ₹{deliveryFee}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="mt-8 space-y-4">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-900 disabled:opacity-60"
                >
                  <Lock size={18} />
                  {loading
                    ? "Processing..."
                    : "Pay Now with Razorpay"}
                </button>

                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-6 py-4 text-lg font-semibold text-gray-900 transition hover:border-black hover:bg-gray-50 disabled:opacity-60"
                >
                  {loading
                    ? "Placing Order..."
                    : "Place COD Order"}
                </button>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                Your payment information is
                processed securely. We do not
                store card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Small Reusable Input ---------------- */

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-black"
      />
    </div>
  );
};