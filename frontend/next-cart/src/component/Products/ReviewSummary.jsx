import { Star, ShieldCheck } from "lucide-react";

export const ReviewSummary = ({ product }) => {

  const total = product.numReviews || 0;

  const ratings = [5, 4, 3, 2, 1];

  const counts = {
    5: product.reviews?.filter(r => r.rating === 5).length || 0,
    4: product.reviews?.filter(r => r.rating === 4).length || 0,
    3: product.reviews?.filter(r => r.rating === 3).length || 0,
    2: product.reviews?.filter(r => r.rating === 2).length || 0,
    1: product.reviews?.filter(r => r.rating === 1).length || 0,
  };

  return (

    <section className="mt-24">

      <div className="grid gap-14 lg:grid-cols-[340px_1fr]">

        {/* LEFT */}

        <div
          className="
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-8
            shadow-sm
          "
        >

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            Customer Reviews
          </p>

          <div className="mt-6 flex items-center gap-4">

            <h2 className="text-6xl font-bold">
              {product.averageRating?.toFixed(1) || "0.0"}
            </h2>

            <div>

              <div className="flex">

                {[...Array(5)].map((_, index) => (

                  <Star
                    key={index}
                    size={20}
                    fill="currentColor"
                    className="text-yellow-400"
                  />

                ))}

              </div>

              <p className="mt-2 text-gray-500">
                Based on {total} Reviews
              </p>

            </div>

          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 p-4">

            <ShieldCheck
              size={22}
              className="text-green-600"
            />

            <span className="text-sm font-medium text-green-700">
              Verified Customer Reviews
            </span>

          </div>

        </div>

        {/* RIGHT */}

        <div
          className="
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-8
            shadow-sm
          "
        >

          <h3 className="mb-8 text-2xl font-bold">
            Rating Breakdown
          </h3>

          <div className="space-y-6">

            {ratings.map((star) => {

              const count = counts[star];

              const percentage =
                total > 0
                  ? (count / total) * 100
                  : 0;

              return (

                <div
                  key={star}
                  className="flex items-center gap-5"
                >

                  <span className="w-12 font-semibold">
                    {star} ★
                  </span>

                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">

                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                  <span className="w-10 text-right text-gray-500">

                    {count}

                  </span>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </section>

  );

};