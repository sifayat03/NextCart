import { Star, Send } from "lucide-react";

export const ReviewForm = ({
  canReview,
  rating,
  setRating,
  comment,
  setComment,
  handleReviewSubmit,
}) => {

  if (!canReview) {

    return (
      <div
        className="
          mt-14
          rounded-3xl
          border
          border-gray-200
          bg-gray-50
          p-8
          text-center
        "
      >
        <p className="text-lg text-gray-500">
          Only customers who purchased this product
          can leave a review.
        </p>
      </div>
    );

  }

  return (

    <form
      onSubmit={handleReviewSubmit}
      className="
        mt-14
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-8
        shadow-sm
      "
    >

      {/* Heading */}

      <h2 className="text-3xl font-bold">
        Write a Review
      </h2>

      <p className="mt-2 text-gray-500">
        Share your experience with other customers.
      </p>

      {/* Stars */}

      <div className="mt-8">

        <p className="mb-3 font-medium">
          Your Rating
        </p>

        <div className="flex gap-2">

          {[1,2,3,4,5].map((value)=>(

            <button
              key={value}
              type="button"
              onClick={()=>setRating(value)}
              className="
                transition-all
                duration-300
                hover:scale-125
              "
            >

              <Star
                size={34}
                fill={
                  value <= rating
                    ? "#facc15"
                    : "transparent"
                }
                className="
                  text-yellow-400
                "
              />

            </button>

          ))}

        </div>

      </div>

      {/* Textarea */}

      <div className="mt-8">

        <textarea
          rows={6}
          value={comment}
          onChange={(e)=>
            setComment(e.target.value)
          }
          placeholder="Tell others what you liked (or disliked)..."
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-gray-300
            p-5
            outline-none
            transition-all
            duration-300
            focus:border-black
            focus:ring-4
            focus:ring-gray-100
          "
        />

      </div>

      {/* Button */}

      <button
        type="submit"
        className="
          mt-8
          flex
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-black
          px-8
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-gray-900
          hover:shadow-xl
        "
      >

        <Send size={20} />

        Submit Review

      </button>

    </form>

  );

};