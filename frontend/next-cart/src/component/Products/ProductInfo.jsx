import {
  BadgeCheck,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";

export const ProductInfo = ({ product }) => {
  const discount = 17;

  const oldPrice = Math.round(
    product.price / (1 - discount / 100)
  );

  return (
    <div className="space-y-7">

      {/* Category */}

      <span
        className="
          inline-flex
          rounded-full
          bg-gray-100
          px-4
          py-2
          text-xs
          font-semibold
          uppercase
          tracking-[0.25em]
          text-gray-600
        "
      >
        {product.category}
      </span>

      {/* Name */}

      <h1
        className="
          text-4xl
          font-bold
          leading-tight
          tracking-tight
          text-gray-900
          lg:text-5xl
        "
      >
        {product.name}
      </h1>

      {/* Rating */}

      <div className="flex items-center gap-3">

        <div className="flex">

          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill="currentColor"
              className="text-yellow-400"
            />
          ))}

        </div>

        <span className="font-semibold">
          {product.averageRating?.toFixed(1) || "0.0"}
        </span>

        <span className="text-gray-500">
          ({product.numReviews || 0} Reviews)
        </span>

      </div>

      {/* Price */}

      <div className="flex items-end gap-4">

        <span className="text-5xl font-bold text-black">
          ₹{product.price}
        </span>

        <span className="text-xl text-gray-400 line-through">
          ₹{oldPrice}
        </span>

        <span
          className="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-sm
            font-semibold
            text-green-700
          "
        >
          Save {discount}%
        </span>

      </div>

      {/* Description */}

      <p className="text-lg leading-8 text-gray-600">
        {product.description}
      </p>

      {/* Stock */}

      <div
        className="
          flex
          items-center
          gap-2
          text-green-600
          font-semibold
        "
      >
        <BadgeCheck size={20} />
        {product.stock} Items In Stock
      </div>

      {/* Features */}

      <div className="space-y-4 border-t border-gray-200 pt-6">

        <div className="flex items-center gap-3">

          <Truck
            size={20}
            className="text-gray-700"
          />

          <span className="text-gray-600">
            Delivery in 2–4 Business Days
          </span>

        </div>

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={20}
            className="text-gray-700"
          />

          <span className="text-gray-600">
            100% Secure Payment
          </span>

        </div>

        <div className="flex items-center gap-3">

          <RotateCcw
            size={20}
            className="text-gray-700"
          />

          <span className="text-gray-600">
            7-Day Easy Returns
          </span>

        </div>

      </div>

    </div>
  );
};