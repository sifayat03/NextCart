import { useEffect, useState } from "react";
import axios from "axios";

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

      setOrders(res.data.orders);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders");
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
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              Start shopping to see your orders here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >

                {/* Header */}
                <div className="border-b p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3">

                  <div>
                    <h2 className="font-bold text-lg">
                      Order #{order.orderNumber}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      Placed on{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div className="p-5">

                  <div className="space-y-4">

                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 border rounded-lg p-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">

                          <h3 className="text-lg font-semibold">
                            {item.name}
                          </h3>

                          <p className="text-gray-600">
                            Quantity: {item.qty}
                          </p>

                          <p className="text-gray-600">
                            Price: ₹{item.price}
                          </p>

                          <p className="font-semibold mt-2">
                            Subtotal: ₹
                            {item.price * item.qty}
                          </p>

                        </div>
                      </div>
                    ))}

                  </div>

                  {/* Address */}
                  <div className="mt-6 border-t pt-5">

                    <h3 className="font-semibold text-lg mb-2">
                      Delivery Address
                    </h3>

                    <p>
                      {order.address.fullName}
                    </p>

                    <p>
                      {order.address.street}
                    </p>

                    <p>
                      {order.address.city},{" "}
                      {order.address.postalCode}
                    </p>

                    <p>
                      {order.address.country}
                    </p>

                  </div>

                  {/* Payment + Total */}
                  <div className="mt-6 border-t pt-5 flex flex-col md:flex-row md:justify-between gap-3">

                    <div>
                      <p className="font-medium">
                        Payment Status:
                      </p>

                      <p
                        className={
                          order.paymentStatus ===
                          "Paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {order.paymentStatus}
                      </p>
                    </div>

                    <div className="text-xl font-bold">
                      Total: ₹{order.totalAmount}
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

