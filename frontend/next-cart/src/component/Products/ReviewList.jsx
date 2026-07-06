import { ShieldCheck, Star } from "lucide-react";

export const ReviewList = ({ reviews }) => {

  if (!reviews?.length) {

    return (

      <div className="mt-14 rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center">

        <h3 className="text-2xl font-bold">
          No Reviews Yet
        </h3>

        <p className="mt-3 text-gray-500">
          Be the first customer to review this product.
        </p>

      </div>

    );

  }

  return (

    <section className="mt-16 p-6">

      <h2 className="mb-8 text-3xl font-bold">
        Customer Reviews
      </h2>

      <div className="space-y-6">

        {reviews.map((review) => (

          <div
            key={review._id}
            className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-7
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            {/* Header */}

            <div className="flex items-start justify-between">

              <div className="flex gap-4">

                {/* Avatar */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  {review.name?.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h3 className="text-lg font-semibold">
                    {review.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">

                    <ShieldCheck
                      size={16}
                      className="text-green-600"
                    />

                    <span className="text-sm text-green-600">
                      Verified Purchase
                    </span>

                  </div>

                </div>

              </div>

              {/* Rating */}

              <div className="flex">

                {[...Array(review.rating)].map((_, i) => (

                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                    className="text-yellow-400"
                  />

                ))}

              </div>

            </div>

            {/* Comment */}

            <p className="mt-6 leading-8 text-gray-600">
              {review.comment}
            </p>

            {/* Footer */}

            <div className="mt-6 flex items-center justify-between">

              <span className="text-sm text-gray-400">
                {new Date(
                  review.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <button
                className="
                  rounded-full
                  border
                  border-gray-200
                  px-4
                  py-2
                  text-sm
                  transition
                  hover:border-black
                "
              >
                Helpful 👍
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

};