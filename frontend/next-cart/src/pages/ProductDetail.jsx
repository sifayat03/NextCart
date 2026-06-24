import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  // product review
  const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
     const res = await axios.get(
  `http://localhost:5000/api/products/get-product/${id}`,
  {
    withCredentials: true,
  }
);

setProduct(res.data.product);
console.log(res.data)

setCanReview(res.data.canReview);

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
      `http://localhost:5000/api/products/${id}/review`,
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
        "http://localhost:5000/api/cart/add",
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
    <div className="max-w-7xl mx-auto p-6">

      <div className="grid md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <p className="text-3xl font-bold mt-6">
            ₹{product.price}
          </p>

          <div className="mt-4 space-y-2">

            <p>
              <span className="font-semibold">
                Category:
              </span>{" "}
              {product.category}
            </p>

            <p>
              <span className="font-semibold">
                Available Stock:
              </span>{" "}
              {product.stock}
            </p>

          </div>

          {/* Quantity */}
          <div className="mt-6">

            <label className="block font-medium mb-2">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={(e) =>
                setQty(Number(e.target.value))
              }
              className="border rounded-lg px-4 py-2 w-24"
            />

          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
            >
              {addingToCart
                ? "Adding..."
                : "Add To Cart"}
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>


       <div className="mt-8">

  <h2 className="text-2xl font-bold mb-2">
    Reviews
  </h2>

  <div className="flex items-center gap-2 mb-4">

    <span className="text-yellow-500 text-xl">
      ⭐
    </span>

    <span>
      {product.averageRating?.toFixed(1) || 0}
    </span>

    <span className="text-gray-500">
      ({product.numReviews || 0} Reviews)
    </span>

  </div>

</div>


{canReview && (
  <form
  onSubmit={handleReviewSubmit}
  className="bg-white p-5 rounded-lg shadow mb-8"
>

  <h3 className="text-xl font-semibold mb-4">
    Write a Review
  </h3>

  <select
    value={rating}
    onChange={(e) =>
      setRating(e.target.value)
    }
    className="border p-2 rounded w-full mb-4"
  >

    <option value="1">
      1 Star
    </option>

    <option value="2">
      2 Stars
    </option>

    <option value="3">
      3 Stars
    </option>

    <option value="4">
      4 Stars
    </option>

    <option value="5">
      5 Stars
    </option>

  </select>

  <textarea
    rows="4"
    placeholder="Write your review..."
    value={comment}
    onChange={(e) =>
      setComment(e.target.value)
    }
    className="border p-2 rounded w-full mb-4"
  />

  <button
    type="submit"
    className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
  >
    Submit Review
  </button>

</form> )}

{!canReview && (
  <p className="text-gray-500">
    Only customers who purchased this
    product can leave a review.
  </p>
)}

 <div className="space-y-4">

  {product.reviews?.length > 0 ? (

    product.reviews.map((review) => (

      <div
        key={review._id}
        className="bg-white p-4 rounded-lg shadow"
      >

        <div className="flex justify-between">

          <h4 className="font-semibold">
            {review.name}
          </h4>

          <span className="text-yellow-500">
            {"⭐".repeat(review.rating)}
          </span>

        </div>

        <p className="text-gray-700 mt-2">
          {review.comment}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {new Date(
            review.createdAt
          ).toLocaleDateString()}
        </p>

      </div>

    ))

  ) : (

    <p className="text-gray-500">
      No Reviews Yet
    </p>

  )}

</div>

    </div>
  );
};

