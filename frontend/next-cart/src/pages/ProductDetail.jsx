import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductGallery } from "../component/Products/ProductGallery";
import { ProductInfo } from "../component/Products/ProductInfo";
import { QuantitySelector } from "../component/Products/QuantitySelector";
import { ProductActions } from "../component/Products/ProductActions";
import { ReviewSummary } from "../component/Products/ReviewSummary";
import { ReviewForm } from "../component/Products/ReviewForm";
import { ReviewList } from "../component/Products/ReviewList";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";


export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialWishlist, setInitialWishlist] = useState(false);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  // product review
  const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const [canReview, setCanReview] = useState(false);

const { wishlistIds, toggleWishlist } =
  useWishlist();

const isWishlisted =
  product && wishlistIds.includes(product._id);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
     const res = await axios.get(
      `https://nextcart-backend-kxc0.onrender.com/api/products/get-product/${id}`,
  {
    withCredentials: true,
  }
);

setProduct(res.data.product);
console.log(res.data)

setCanReview(res.data.canReview);
setInitialWishlist(res.data.isWishlisted || false);

    } catch(error){
  console.log(error.res?.data);

    } finally {
      setLoading(false);
    }
  };


// review function
  const handleReviewSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await axios.post(
      `https://nextcart-backend-kxc0.onrender.com/api/products/${id}/review`,
      {
        rating,
        comment,
      },
      {
        withCredentials: true,
      }
    );

    alert(res.data.message);

    setRating(5);
    setComment("");

    fetchProduct();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to submit review"
    );

  }
};

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);

      const res = await axios.post(
        "https://nextcart-backend-kxc0.onrender.com/api/cart/add",
        {
          productId: product._id,
          quantity: qty,
        },
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
   navigate("/checkout", {
  state: {
    items: [
      {
        productId: product._id,
        quantity: qty,
        price: product.price,
        name: product.name,
        imageUrl: product.imageUrl,
      },
    ],
  },
});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Product Not Found
      </div>
    );
  }

  return (
    <>
   
<div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">

  <Link
    to="/"
    className="transition hover:text-black"
  >
    Home
  </Link>

  <ChevronRight size={15} />

  <Link
    to="/shop"
    className="transition hover:text-black"
  >
    Shop
  </Link>

  <ChevronRight size={15} />

  <span className="capitalize">
    {product.category}
  </span>

  <ChevronRight size={15} />

  <span className="font-medium text-black">
    {product.name}
  </span>

</div>

    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
      

<ProductGallery product={product} />
 <div>
  <ProductInfo product={product} />
  <div className="my-8 border-t border-gray-200" />

  {/* Quantity */}
  <QuantitySelector
    quantity={qty}
    setQuantity={setQty}
    stock={product.stock}
/>

  {/* Buttons */}
  <ProductActions
    addingToCart={addingToCart}
    handleAddToCart={handleAddToCart}
    handleBuyNow={handleBuyNow}
  isWishlisted={isWishlisted}
  toggleWishlist={() => toggleWishlist(product)}
/>

</div>
<ReviewSummary product={product} />

<ReviewForm
    canReview={canReview}
    rating={rating}
    setRating={setRating}
    comment={comment}
    setComment={setComment}
    handleReviewSubmit={handleReviewSubmit}
/>

<ReviewList
    reviews={product.reviews}
/>
    </div>

    
    </>
  );
};

