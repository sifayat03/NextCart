import { SearchX } from "lucide-react";

export default function EmptyProducts({
  clearFilters,
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[32px]
        border
        border-gray-200
        bg-white
        px-8
        py-24
        text-center
      "
    >
      {/* Icon */}

      <div
        className="
          mb-8
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-gray-100
        "
      >
        <SearchX
          size={42}
          className="text-gray-400"
        />
      </div>

      {/* Title */}

      <h2
        className="
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
        "
      >
        Nothing Found
      </h2>

      {/* Description */}

      <p
        className="
          mt-4
          max-w-md
          text-base
          leading-7
          text-gray-500
        "
      >
        We couldn't find any products
        matching your current search or
        filters.
      </p>

      {/* Button */}

      <button
        onClick={clearFilters}
        className="
          mt-10
          rounded-full
          bg-black
          px-8
          py-3
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-gray-900
        "
      >
        Reset Filters
      </button>
    </div>
  );
}