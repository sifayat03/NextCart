import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../component/ProductCard";

export const Wishlist = () => {
  const {
    wishlistProducts,
    loading,
  } = useWishlist();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            {wishlistProducts.length}{" "}
            {wishlistProducts.length === 1
              ? "item"
              : "items"}{" "}
            saved for later
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Save products you love and
              they’ll appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map(
              product => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};