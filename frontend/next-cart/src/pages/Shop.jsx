import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ProductCard } from "../component/ProductCard";
import  ShopHero  from "../component/SHOP/ShopHero";
import ShopLayout from "../component/SHOP/ShopLayout";
import FilterSidebar from "../component/SHOP/FilterSidebar";
import ShopToolbar from "../component/SHOP/ShopToolbar";
import { ProductGrid } from "../component/SHOP/ProductGrid";
import EmptyProducts from "../component/SHOP/EmptyProducts";
import ProductSkeletonGrid from "../component/SHOP/ProductSkeletonGrid";
import { ShopFeatures } from "../component/SHOP/ShopFeatures";



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

 const [priceFilter, setPriceFilter] = useState({
  min: "",
  max: "",
});

  // Applied filters

 /* const [appliedFilters, setAppliedFilters] =
    useState({
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    }); */

    const [appliedFilters, setAppliedFilters] = useState()

    

    const fetchWishlist = async () => {
  try {

    const res = await axios.get(
      "https://nextcart-backend-kxc0.onrender.com/api/auth/wishlist",
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
        "https://nextcart-backend-kxc0.onrender.com/api/products/get-products",
        {
          params: {
  search,
  category,
   minPrice: priceFilter.min,
  maxPrice: priceFilter.max,
  sort,
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

 /* useEffect(() => {
  fetchProducts();
}, [search, appliedFilters]);*/

useEffect(() => {
  fetchProducts();
}, [
  search,
  category,
 priceFilter,
  sort,
]);

useEffect(() => {
  fetchWishlist();
}, []);

const applyPriceFilter = () => {
  setPriceFilter({
    min: minPrice,
    max: maxPrice,
  });
};


 /* const applyFilters = () => {
    setAppliedFilters({
      category,
      minPrice,
      maxPrice,
      sort,
    });
  };*/

 /* const clearFilters = () => {
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
  };*/

  const clearFilters = () => {
  setCategory("");
  setMinPrice("");
  setMaxPrice("");
  setSort("");
};

  if (loading) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <ProductSkeletonGrid />
    </div>
  );
}

  return (
    <>
   


<ShopHero totalProducts={products.length}  search={search} />

 <ShopLayout
    sidebar={
    <FilterSidebar
      category={category}
      setCategory={setCategory}

      minPrice={minPrice}
      setMinPrice={setMinPrice}

      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}

      sort={sort}
      setSort={setSort}

    applyPriceFilter={applyPriceFilter}
      clearFilters={clearFilters}
    />
  }
    toolbar={
  <ShopToolbar
    totalProducts={products.length}
    sort={sort}
    setSort={setSort}
  />
}
>

<ProductGrid
  products={products}
  wishlist={wishlist}
/>

{ products.length==0 &&

<EmptyProducts
  clearFilters={clearFilters}
/> }

<ShopFeatures />


</ShopLayout>




    </>
  );
};

