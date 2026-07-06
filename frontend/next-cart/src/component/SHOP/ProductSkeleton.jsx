export default function ProductSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[30px]
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      {/* Image */}

      <div
        className="
          aspect-square
          w-full
          shimmer
          bg-gray-200
        "
      />

      {/* Content */}

      <div className="space-y-4 p-6">

        {/* Category */}

        <div
          className="
            h-3
            w-20
            animate-pulse
            rounded-full
            bg-gray-200
          "
        />

        {/* Product Name */}

        <div
          className="
            h-5
            w-3/4
            shimmer
            rounded-full
            bg-gray-200
          "
        />

        <div
          className="
            h-5
            w-1/2
            shimmer
            rounded-full
            bg-gray-200
          "
        />

        {/* Rating */}

        <div className="flex gap-2">

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="
                h-4
                w-4
                shimmer
                rounded-full
                bg-gray-200
              "
            />
          ))}

        </div>

        {/* Price */}

        <div
          className="
            h-6
            w-24
            shimmer
            rounded-full
            bg-gray-200
          "
        />

        {/* Button */}

        <div
          className="
            mt-4
            h-12
            w-full
            shimmer
            rounded-full
            bg-gray-300
          "
        />

      </div>
    </div>
  );
}