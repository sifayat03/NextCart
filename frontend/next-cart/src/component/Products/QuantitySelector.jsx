import { Minus, Plus } from "lucide-react";

export const QuantitySelector = ({
  quantity,
  setQuantity,
  stock,
}) => {

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="mt-10">

      {/* Heading */}

      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
        Quantity
      </h3>

      <div className="flex items-center gap-5">

        {/* Quantity Box */}

        <div
          className="
            flex
            items-center
            rounded-full
            border
            border-gray-200
            bg-white
            p-2
            shadow-sm
          "
        >

          {/* Minus */}

          <button
            onClick={decrease}
            disabled={quantity === 1}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              transition-all
              duration-300
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Minus size={18} />
          </button>

          {/* Value */}

          <span
            className="
              w-12
              text-center
              text-lg
              font-semibold
            "
          >
            {quantity}
          </span>

          {/* Plus */}

          <button
            onClick={increase}
            disabled={quantity >= stock}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              transition-all
              duration-300
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Plus size={18} />
          </button>

        </div>

        {/* Stock */}

        <span
          className="
            rounded-full
            bg-green-100
            px-4
            py-2
            text-sm
            font-medium
            text-green-700
          "
        >
          {stock} Available
        </span>

      </div>

    </div>
  );
};