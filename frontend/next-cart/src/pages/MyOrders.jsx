import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  PackageCheck,
  ShoppingBag,
  MapPin,
  CreditCard,
  CalendarDays,
} from "lucide-react";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          withCredentials: true,
        }
      );

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getPaymentStyle = (paymentStatus) => {
    switch (paymentStatus) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white px-8 py-6 shadow-lg border border-gray-100 text-lg font-semibold text-gray-700">
          Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 rounded-[32px] bg-white border border-gray-100 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-gray-400">
                Account
              </p>

              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                My Orders
              </h1>

              <p className="mt-3 max-w-2xl text-gray-500 leading-7">
                Track all your purchases, payment status, delivery details,
                and order history in one place.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-black text-white shadow-lg">
              <PackageCheck size={30} />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="rounded-[32px] border border-gray-100 bg-white p-10 md:p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag
                size={36}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              No Orders Yet
            </h2>

            <p className="mt-3 text-gray-500 max-w-xl mx-auto leading-7">
              Looks like you haven’t placed any orders yet. Once you shop and
              checkout, your orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
              >
                {/* Order Header */}
                <div className="border-b border-gray-100 px-6 py-5 md:px-8 md:py-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[2px] text-gray-400">
                        Order
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-gray-900">
                        #{order.orderNumber}
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <div className="inline-flex items-center gap-2">
                          <CalendarDays size={16} />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                      <span
                        className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${getPaymentStyle(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Body */}
                <div className="grid gap-8 px-6 py-6 md:px-8 md:py-8 lg:grid-cols-[1.6fr_0.9fr]">
                  
                  {/* Left: Products */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Ordered Items
                    </h3>

                    <div className="mt-5 space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-4 rounded-[28px] border border-gray-100 bg-[#fafafa] p-4 sm:flex-row sm:items-center"
                        >
                          <div className="h-28 w-full overflow-hidden rounded-2xl bg-white sm:h-24 sm:w-24 shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {item.name}
                            </h4>

                            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                              <p>
                                Qty:
                                <span className="ml-1 font-medium text-gray-800">
                                  {item.qty}
                                </span>
                              </p>

                              <p>
                                Price:
                                <span className="ml-1 font-medium text-gray-800">
                                  ₹{item.price}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="sm:text-right">
                            <p className="text-sm text-gray-500">
                              Subtotal
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                              ₹{item.price * item.qty}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Summary + Address */}
                  <div className="space-y-5">
                    {/* Order Summary */}
                    <div className="rounded-[28px] border border-gray-100 bg-[#fafafa] p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <CreditCard
                            size={20}
                            className="text-gray-800"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Order Summary
                          </h3>
                          <p className="text-sm text-gray-500">
                            Payment & totals
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 text-sm">
                        <div className="flex items-center justify-between text-gray-600">
                          <span>Items</span>
                          <span>
                            {order.items.reduce(
                              (acc, item) => acc + item.qty,
                              0
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-gray-600">
                          <span>Payment Status</span>
                          <span className="font-medium text-gray-900">
                            {order.paymentStatus}
                          </span>
                        </div>

                        {order.paymentMethod && (
                          <div className="flex items-center justify-between text-gray-600">
                            <span>Payment Method</span>
                            <span className="font-medium text-gray-900">
                              {order.paymentMethod}
                            </span>
                          </div>
                        )}

                        <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                          <span className="text-base font-semibold text-gray-900">
                            Total
                          </span>
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{order.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="rounded-[28px] border border-gray-100 bg-[#fafafa] p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <MapPin
                            size={20}
                            className="text-gray-800"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Delivery Address
                          </h3>
                          <p className="text-sm text-gray-500">
                            Shipping details
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2 text-[15px] leading-7 text-gray-700">
                        <p className="font-semibold text-gray-900">
                          {order.address?.fullName}
                        </p>

                        <p>{order.address?.street}</p>

                        <p>
                          {order.address?.city},{" "}
                          {order.address?.postalCode}
                        </p>

                        <p>{order.address?.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};