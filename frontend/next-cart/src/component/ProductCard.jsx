import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  ShoppingBag,
  Eye,
  Star,
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export const ProductCard = ({ product }) => {
  const {
    wishlistIds,
    toggleWishlist,
  } = useWishlist();

  const isWishlisted =
    wishlistIds.includes(product._id);

  const [addingToCart, setAddingToCart] =
    useState(false);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);

      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) *
          100
      )
    : 0;

  return (
    <div
      className="
        group relative overflow-hidden rounded-[32px]
        border border-gray-200 bg-white
        transition-all duration-500
        hover:-translate-y-3
        hover:border-black
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f8f8f8]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="
            h-80 w-full object-contain
            transition duration-700
            group-hover:scale-110
          "
        />

        {/* Discount */}
        {discount > 0 && (
          <span
            className="
              absolute left-5 top-5
              rounded-full bg-red-500
              px-4 py-2 text-xs
              font-semibold text-white
            "
          >
            -{discount}%
          </span>
        )}

        {/* Stock */}
        {product.stock > 0 ? (
          <span
            className="
              absolute right-5 top-5
              rounded-full bg-green-500
              px-4 py-2 text-xs
              font-medium text-white
            "
          >
            In Stock
          </span>
        ) : (
          <span
            className="
              absolute right-5 top-5
              rounded-full bg-black
              px-4 py-2 text-xs text-white
            "
          >
            Sold Out
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className="
            absolute right-5 bottom-24
            flex h-12 w-12 translate-x-20
            items-center justify-center
            rounded-full bg-white
            shadow-lg transition-all duration-500
            group-hover:translate-x-0
          "
        >
          <Heart
            size={22}
            className={`
              transition-all duration-300
              ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "fill-none text-gray-600 hover:text-red-500"
              }
            `}
          />
        </button>

        {/* Quick View */}
        <Link
          to={`/product/${product._id}`}
          className="
            absolute right-5 bottom-9
            flex h-12 w-12 translate-x-20
            items-center justify-center
            rounded-full bg-black text-white
            shadow-lg transition-all duration-700
            group-hover:translate-x-0
          "
        >
          <Eye size={20} />
        </Link>
      </div>

      {/* Content */}
      <div className="p-7">
        <p className="text-sm font-medium uppercase tracking-[3px] text-gray-400">
          {product.category}
        </p>

        <Link to={`/product/${product._id}`}>
          <h2
            className="
              mt-3 line-clamp-2 text-2xl
              font-semibold text-gray-900
              transition group-hover:text-black
            "
          >
            {product.name}
          </h2>

          <p className="mt-2 line-clamp-2 text-gray-600">
            {product.description}
          </p>
        </Link>

        {/* Rating */}
        <div className="mt-5 flex items-center gap-2">
          <Star
            size={18}
            fill="#facc15"
            className="text-yellow-400"
          />
          <span className="font-semibold">
            {product.averageRating?.toFixed(1) ||
              "0.0"}
          </span>
          <span className="text-gray-400">
            ({product.numReviews || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-3xl font-bold">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          disabled={
            addingToCart || product.stock === 0
          }
          className="
            mt-8 flex w-full items-center justify-center gap-2
            rounded-full bg-black py-4 font-semibold text-white
            transition-all duration-300
            hover:scale-[1.03] hover:bg-gray-900
            disabled:cursor-not-allowed disabled:bg-gray-400
          "
        >
          <ShoppingBag size={18} />
          {addingToCart
            ? "Adding..."
            : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};