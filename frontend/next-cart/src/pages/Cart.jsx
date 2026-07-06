import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [updatingId, setUpdatingId] =
    useState(null);

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          withCredentials: true,
        }
      );

      setCart(res.data.items || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${productId}`,
        {
          withCredentials: true,
        }
      );

      setCart((prev) =>
        prev.filter(
          (item) =>
            item.productId._id !== productId
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to remove item");
    }
  };

  const updateQuantity = async (
    productId,
    newQty
  ) => {
    if (newQty < 1) return;

    try {
      setUpdatingId(productId);

      const res = await axios.put(
        `http://localhost:5000/api/cart/${productId}`,
        { quantity: newQty },
        {
          withCredentials: true,
        }
      );

      setCart(res.data.items || []);
    } catch (error) {
      console.error(error);
      alert("Failed to update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.productId.price * item.quantity,
    0
  );

  const delivery =
    cart.length > 0 ? 99 : 0;

  const totalAmount =
    subtotal + delivery;

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        items: cart.map((item) => ({
          productId:
            item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
          name: item.productId.name,
          imageUrl:
            item.productId.imageUrl,
        })),
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            My Cart
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            {cart.length}{" "}
            {cart.length === 1
              ? "item"
              : "items"}{" "}
            in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-gray-300 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag
                size={34}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Looks like you haven’t added
              anything yet. Explore products
              and build your next cart.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 font-semibold text-white transition hover:bg-gray-900"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            {/* LEFT — Cart Items */}
            <div className="space-y-5">
              {cart.map((item) => {
                const product =
                  item.productId;

                return (
                  <div
                    key={product._id}
                    className="rounded-[28px] bg-white p-4 sm:p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row">
                      {/* Image */}
                      <Link
                        to={`/product/${product._id}`}
                        className="shrink-0"
                      >
                        <div className="flex h-32 w-full sm:w-32 items-center justify-center rounded-2xl bg-[#f6f6f6] p-3">
                          <img
                            src={
                              product.imageUrl
                            }
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex flex-1 flex-col justify-between gap-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <Link
                              to={`/product/${product._id}`}
                            >
                              <h2 className="text-xl font-semibold text-gray-900 hover:text-black">
                                {
                                  product.name
                                }
                              </h2>
                            </Link>

                            <p className="mt-2 text-sm text-gray-500">
                              Category:{" "}
                              {
                                product.category
                              }
                            </p>

                            <p className="mt-3 text-2xl font-bold text-gray-900">
                              ₹
                              {
                                product.price
                              }
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              removeItem(
                                product._id
                              )
                            }
                            className="inline-flex items-center gap-2 self-start rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100"
                          >
                            <Trash2
                              size={16}
                            />
                            Remove
                          </button>
                        </div>

                        {/* Bottom row */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-600">
                              Quantity
                            </span>

                            <div className="flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product._id,
                                    item.quantity -
                                      1
                                  )
                                }
                                disabled={
                                  updatingId ===
                                    product._id ||
                                  item.quantity ===
                                    1
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <Minus
                                  size={16}
                                />
                              </button>

                              <span className="min-w-[36px] text-center text-base font-semibold">
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product._id,
                                    item.quantity +
                                      1
                                  )
                                }
                                disabled={
                                  updatingId ===
                                  product._id
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <Plus
                                  size={16}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Line total */}
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Total
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              ₹
                              {product.price *
                                item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — Summary */}
            <div>
              <div className="sticky top-24 rounded-[32px] bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-8 space-y-5">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>
                      Subtotal
                    </span>
                    <span className="font-semibold text-gray-900">
                      ₹{subtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>
                      Delivery
                    </span>
                    <span className="font-semibold text-gray-900">
                      ₹{delivery}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-3xl font-bold text-gray-900">
                        ₹
                        {totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={
                    handleCheckout
                  }
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-900"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>

                <Link
                  to="/shop"
                  className="mt-4 block text-center text-sm font-medium text-gray-500 hover:text-black"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};