import {
  Heart,
  ShoppingBag,
  Zap,
} from "lucide-react";

export const ProductActions = ({
  addingToCart,
  handleAddToCart,
  handleBuyNow,
  isWishlisted,
  toggleWishlist,
}) => {
  return (
    <div className="mt-10 space-y-4">

      {/* Add To Cart */}

      <button
        onClick={handleAddToCart}
        disabled={addingToCart}
        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-black
          px-6
          py-4
          text-lg
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-gray-900
          hover:shadow-2xl
        "
      >
        <ShoppingBag
          size={22}
          className="
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />

        {addingToCart
          ? "Adding..."
          : "Add To Cart"}
      </button>

      {/* Buy Now */}

      <button
        onClick={handleBuyNow}
        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-gray-300
          bg-white
          px-6
          py-4
          text-lg
          font-semibold
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-black
          hover:bg-gray-50
          hover:shadow-xl
        "
      >
        <Zap
          size={22}
          className="
            text-yellow-500
            transition-transform
            duration-300
            group-hover:rotate-12
          "
        />

        Buy Now

      </button>

      {/* Wishlist */}

      <button 
      onClick={toggleWishlist}
        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-6
          py-4
          text-gray-700
          transition-all
          duration-300
          hover:border-red-200
          hover:bg-red-50
          hover:text-red-500
        "
      >
        <Heart
          size={20}
         
          className={`
            transition-transform
            duration-300
            group-hover:scale-125
    
    ${
      isWishlisted
        ? "fill-red-500 text-red-500"
        : "fill-none text-gray-600 hover:text-red-500"
    }
  `}
        />

        {isWishlisted
    ? "Remove from Wishlist"
    : "Add to Wishlist"}

      </button>

    </div>
  );
};