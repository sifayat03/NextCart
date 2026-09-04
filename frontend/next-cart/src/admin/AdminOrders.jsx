import { useEffect, useState } from "react";
import axios from "axios";

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://nextcart-backend-kxc0.onrender.com/api/orders/all",
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

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `https://nextcart-backend-kxc0.onrender.com/api/orders/update-status/${orderId}`,
        { status },
        {
          withCredentials: true,
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Admin Orders Dashboard
        </h1>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Total Orders
            </h3>

            <p className="text-3xl font-bold">
              {orders.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Pending
            </h3>

            <p className="text-3xl font-bold text-yellow-600">
              {pendingOrders}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Delivered
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {deliveredOrders}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Revenue
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              ₹{totalRevenue}
            </p>
          </div>

        </div>

        {/* Orders */}

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              {/* Header */}

              <div className="border-b p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>
                  <h2 className="font-bold text-xl">
                    Order #{order.orderNumber}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-4 py-2"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>

              </div>

              <div className="p-6">

                {/* Customer */}

                <div className="mb-6">

                  <h3 className="font-bold text-lg mb-2">
                    Customer Details
                  </h3>

                  <p>
                    Name: {order.userId?.name}
                  </p>

                  <p>
                    Email: {order.userId?.email}
                  </p>

                </div>

                {/* Products */}

                <div>

                  <h3 className="font-bold text-lg mb-4">
                    Ordered Products
                  </h3>

                  <div className="space-y-4">

                    {order.items.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="border rounded-xl p-4 flex gap-4"
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />

                          <div className="flex-1">

                            <h4 className="font-semibold text-lg">
                              {item.name}
                            </h4>

                            <p>
                              Quantity: {item.qty}
                            </p>

                            <p>
                              Price: ₹
                              {item.price}
                            </p>

                            <p className="font-semibold">
                              Subtotal: ₹
                              {item.price *
                                item.qty}
                            </p>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* Address */}

                <div className="mt-6 border-t pt-6">

                  <h3 className="font-bold text-lg mb-2">
                    Delivery Address
                  </h3>

                  <p>
                    {
                      order.address
                        ?.fullName
                    }
                  </p>

                  <p>
                    {
                      order.address
                        ?.street
                    }
                  </p>

                  <p>
                    {
                      order.address
                        ?.city
                    }
                    ,{" "}
                    {
                      order.address
                        ?.postalCode
                    }
                  </p>

                  <p>
                    {
                      order.address
                        ?.country
                    }
                  </p>

                </div>

                {/* Footer */}

                <div className="mt-6 border-t pt-6 flex flex-col md:flex-row md:justify-between gap-4">

                  <div>
                    <p className="font-semibold">
                      Payment Status
                    </p>

                    <p
                      className={
                        order.paymentStatus ===
                        "Paid"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    >
                      {
                        order.paymentStatus
                      }
                    </p>
                  </div>

                  <div className="text-2xl font-bold">
                    Total: ₹
                    {
                      order.totalAmount
                    }
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};
