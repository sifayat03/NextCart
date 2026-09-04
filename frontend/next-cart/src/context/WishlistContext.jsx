import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Whole wishlist products
  const [wishlistProducts, setWishlistProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // -----------------------------
  // Fetch Wishlist
  // -----------------------------

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        "https://nextcart-backend-kxc0.onrender.com/api/auth/wishlist",
        {
          withCredentials: true,
        }
      );

      setWishlistProducts(
        res.data.wishlist || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // -----------------------------
  // Wishlist IDs
  // -----------------------------

  const wishlistIds = useMemo(() => {
    return wishlistProducts.map(
      product => product._id
    );
  }, [wishlistProducts]);

  // -----------------------------
  // Toggle Wishlist
  // -----------------------------

  const toggleWishlist = async (
    product
  ) => {
    const alreadyExists =
      wishlistIds.includes(product._id);

    // Optimistic Update

    if (alreadyExists) {
      setWishlistProducts(prev =>
        prev.filter(
          p => p._id !== product._id
        )
      );
    } else {
      setWishlistProducts(prev => [
        ...prev,
        product,
      ]);
    }

    try {
      await axios.post(
        `https://nextcart-backend-kxc0.onrender.com/api/auth/wishlist/${product._id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);

      // Rollback

      if (alreadyExists) {
        setWishlistProducts(prev => [
          ...prev,
          product,
        ]);
      } else {
        setWishlistProducts(prev =>
          prev.filter(
            p => p._id !== product._id
          )
        );
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistProducts,
        wishlistIds,
        toggleWishlist,
        loading,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);