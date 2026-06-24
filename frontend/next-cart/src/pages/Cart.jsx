import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCart();
  }, []);

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      item.productId.price *
      item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        My Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          Cart is Empty
        </div>
      ) : (
        <>
          <div className="space-y-4">

            {cart.map((item) => (

              <div
                key={item.productId._id}
                className="bg-white shadow rounded-xl p-4 flex items-center gap-4"
              >
                <img
                  src={item.productId.imageUrl}
                  alt={item.productId.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {item.productId.name}
                  </h2>

                  <p>
                    ₹{item.productId.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeItem(
                      item.productId._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>

            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">
              Total: ₹{totalAmount}
            </h2>

            <button
              className="mt-4 w-full bg-black text-white py-3 rounded-lg"
            >
              <Link to="/checkout">Proceed to checkout</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

