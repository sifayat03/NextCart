import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const ProductCard = ({ product, isWishlisted: initialWishlist }) => {

  const [isWishlisted, setIsWishlisted] =
  useState(initialWishlist);

  const handleWishlist = async () => {
    try {
       const previousState = isWishlisted;
  // Instant UI update
  setIsWishlisted(!isWishlisted);

      const response = await axios.post(
        `http://localhost:5000/api/auth/wishlist/${product._id}`, {},
        {   withCredentials: true, }
      );

    setIsWishlisted(
      response.data.isWishlisted
    );

    } catch (error) {
      const previousState = isWishlisted;
      setIsWishlisted(previousState);
     
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }
  };

  useEffect(() => {
  setIsWishlisted(initialWishlist);
}, [initialWishlist]);

  return (

    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden
     shadow-lg hover:shadow-orange-500/20 hover:-translate-y-2 transition-all duration-300">

      {/* Top Rated Badge */}

      {product.averageRating >= 4 && (

        <div className="absolute z-10 m-3">
          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            ⭐ Top Rated
          </span>
        </div>

      )}

      {/* Product Image */}

      <div className="overflow-hidden">

        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

      </div>

      {/* Content */}

      <div className="p-5">

        {/* Product Name */}

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-2 mb-3">

          <span className="text-yellow-400">
            ⭐
          </span>

          <span className="text-white font-medium">
            {product.averageRating?.toFixed(1) || "0.0"}
          </span>

          <span className="text-zinc-400 text-sm">
            ({product.numReviews || 0} reviews)
          </span>

        </div>

        {/* Price */}

        <p className="text-2xl font-bold text-orange-500 mb-5">
          ₹{product.price}
        </p>

        {/* Buttons */}

        <div className="flex gap-3">

          

<button
  onClick={handleWishlist}
  className="absolute top-4 right-4 z-20 text-3xl hover:scale-125 transition"
>
  {isWishlisted ? "❤️" : "🤍"}
</button>

          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
          >
            View
          </Link>

        </div>

      </div>

    </div>

  );
};