import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ProductCard } from "../component/ProductCard";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const location = useLocation();

  const search =
    new URLSearchParams(location.search).get(
      "search"
    ) || "";

  // Filter states

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  // Applied filters

  const [appliedFilters, setAppliedFilters] =
    useState({
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });

    const fetchWishlist = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/auth/wishlist",
      {
        withCredentials: true,
      }
    );

    setWishlist(
      res.data.wishlist.map(
        item => item._id
      )
    );

  } catch (error) {

    console.log(error);

  }
};

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/products/get-products",
        {
          params: {
            search,
            category:
              appliedFilters.category,
            minPrice:
              appliedFilters.minPrice,
            maxPrice:
              appliedFilters.maxPrice,
            sort: appliedFilters.sort,
          },
        }
      );

      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchProducts();
}, [search, appliedFilters]);

useEffect(() => {
  fetchWishlist();
}, []);


  const applyFilters = () => {
    setAppliedFilters({
      category,
      minPrice,
      maxPrice,
      sort,
    });
  };

  const clearFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");

    setAppliedFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">

          <h1 className="text-3xl font-bold">
            Shop
          </h1>

          {search && (
            <p className="text-gray-500 mt-2">
              Search Results For:
              <span className="font-semibold ml-2">
                {search}
              </span>
            </p>
          )}

        </div>
      </div>

      {/* Filters */}

      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="bg-white rounded-xl shadow p-5 mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Filters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Category */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            >
              <option value="">
                All Categories
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Books">
                Books
              </option>

              <option value="Shoes">
                Shoes
              </option>
            </select>

            {/* Min Price */}

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            />

            {/* Max Price */}

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            />

            {/* Sort */}

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            >
              <option value="">
                Sort By
              </option>

              <option value="low-high">
                Price Low → High
              </option>

              <option value="high-low">
                Price High → Low
              </option>
            </select>

          </div>

          <div className="flex gap-4 mt-5">

            <button
              onClick={applyFilters}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
            >
              Apply Filters
            </button>

            <button
              onClick={clearFilters}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* Products */}

        {products.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-bold">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing filters
            </p>

          </div>

        ) : (

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {products.map((product) => (
    <ProductCard
      key={product._id}
      product={product}
      isWishlisted={wishlist.includes(product._id)}
    />
  ))}
</div>

        )}

      </div>

    </div>
  );
};

