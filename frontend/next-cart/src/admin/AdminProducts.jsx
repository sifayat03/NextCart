import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/get-products",
        {
          withCredentials: true,
        }
      );

      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Manage Products
        </h1>

        {products.length === 0 ? (
          <div className="text-center text-gray-500">
            No products found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-lg font-bold mt-3">
                    ₹{product.price}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Category: {product.category}
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>

                  <p className="text-xs text-gray-400 break-all mt-2">
                    ID: {product._id}
                  </p>

                  <div className="mt-auto flex gap-2 pt-4">
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
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

