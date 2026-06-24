import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { ProductCard } from "../component/ProductCard";

export const Wishlist = () => {

  const [products, setProducts] =
    useState([]);

  const fetchWishlist = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/auth/wishlist",
        {
          withCredentials: true,
        }
      );

      setProducts(res.data.wishlist);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Wishlist ❤️
      </h1>

      {products.length === 0 ? (
        <p>No products in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">

          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>
      )}

    </div>
  );
};

