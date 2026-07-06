import { SlidersHorizontal } from "lucide-react";
import { ArrowRight } from "lucide-react";

const categories = [
  "Electronics",
  "Fashion",
  "Shoes",
  "Books",
];

const sortOptions = [
  {
    label: "Newest",
    value: "",
  },
  {
    label: "Price : Low → High",
    value: "low-high",
  },
  {
    label: "Price : High → Low",
    value: "high-low",
  },
];

const FilterSidebar = ({
  category,
  setCategory,

  minPrice,
  setMinPrice,

  maxPrice,
  setMaxPrice,

  sort,
  setSort,

  
  clearFilters,
  applyPriceFilter,
}) => {
  return (
    <div
      className="
      rounded-[32px]
      border
      border-gray-200
      bg-white
      p-7
      shadow-sm
    "
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <SlidersHorizontal size={20} />

        <h2 className="text-lg font-semibold">

          Filters

        </h2>

      </div>

      {/* Category */}

      <div className="mt-8">

        <h3 className="mb-4 font-semibold">

          Category

        </h3>

        <div className="space-y-3">

          {categories.map((item) => (

            <label
              key={item}
              className="flex cursor-pointer items-center gap-3"
            >

              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() =>
                  setCategory(item)
                }
                className="h-4 w-4 accent-black"
              />

              <span className="text-gray-600">

                {item}

              </span>

            </label>

          ))}

        </div>

      </div>

      {/* Price */}

      <div className="mt-8">

        <h3 className="mb-4 font-semibold">

          Price Range

        </h3>

        <div className="space-y-3">

          <input
            type="number"
            placeholder="Minimum"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
            className="
              h-11
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              outline-none
              focus:border-black
            "
          />

          <input
            type="number"
            placeholder="Maximum"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
            className="
              h-11
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              outline-none
              focus:border-black
            "
          />

         <button
  onClick={applyPriceFilter}
  className="
    group
    mt-6
    flex
    h-12
    w-full
    items-center
    justify-center
    gap-2
    rounded-full
    bg-black
    text-sm
    font-semibold
    text-white
    shadow-lg
    shadow-black/10
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-xl
    hover:shadow-black/20
    active:translate-y-0
    active:scale-[0.98]
  "
>
  Apply Price

  <ArrowRight
    size={17}
    className="
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
  />
</button>

        </div>

      </div>

      {/* Sort */}

      <div className="mt-8">

        <h3 className="mb-4 font-semibold">

          Sort By

        </h3>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="
            h-11
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            outline-none
            focus:border-black
          "
        >
          {sortOptions.map((item) => (

            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>

          ))}
        </select>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex gap-3">

    

        <button
          onClick={clearFilters}
          className="
            flex-1
            rounded-full
            border
            border-gray-300
            py-3
            transition
            hover:border-black
          "
        >
          Clear
        </button>

      </div>

    </div>
  );
};

export default FilterSidebar;