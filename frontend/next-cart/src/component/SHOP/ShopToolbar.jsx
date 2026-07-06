import { ArrowDownWideNarrow } from "lucide-react";

const ShopToolbar = ({
  totalProducts,
  sort,
  setSort,
}) => {
  return (
    <div
      className="
      flex
      flex-col
      gap-5
      rounded-[28px]
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
      sm:flex-row
      sm:items-center
      sm:justify-between
    "
    >
      {/* Left */}

      <div>

        <p className="text-sm text-gray-500">

          Showing

        </p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight">

          {totalProducts}

          <span className="ml-2 text-lg font-medium text-gray-500">

            Products

          </span>

        </h2>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <ArrowDownWideNarrow
          size={20}
          className="text-gray-500"
        />

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="
            h-12
            rounded-full
            border
            border-gray-300
            bg-white
            px-5
            text-sm
            outline-none
            transition
            focus:border-black
          "
        >
          <option value="">
            Newest
          </option>

          <option value="low-high">
            Price : Low → High
          </option>

          <option value="high-low">
            Price : High → Low
          </option>
        </select>

      </div>

    </div>
  );
};

export default ShopToolbar;