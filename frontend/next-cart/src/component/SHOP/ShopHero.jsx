import { ShoppingBag } from "lucide-react";

const ShopHero = ({ totalProducts, search }) => {
  return (
    <section className="bg-[#fafafa] border-b border-gray-200">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span
              className="
              inline-flex
              items-center
              rounded-full
              border
              border-gray-300
              bg-white
              px-5
              py-2
              text-sm
              font-medium
              text-gray-600
              shadow-sm
            "
            >
              Shop
            </span>

            <h1
              className="
              mt-8
              text-5xl
              font-bold
              tracking-tight
              text-gray-900
              md:text-7xl
            "
            >
              Discover
              <br />
              Premium
              Collection.
            </h1>

            <p
              className="
              mt-8
              max-w-xl
              text-lg
              leading-9
              text-gray-500
            "
            >
              Explore carefully curated products
              designed to simplify everyday life.
              Premium quality meets timeless design.
            </p>

            {search && (
              <div className="mt-8 inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white">
                Searching for:
                <span className="ml-2 font-semibold">
                  {search}
                </span>
              </div>
            )}

          </div>

          {/* Right */}

          <div className="flex justify-center lg:justify-end">

            <div
              className="
              rounded-[36px]
              border
              border-gray-200
              bg-white
              p-10
              shadow-lg
            "
            >

              <div
                className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-black
                text-white
              "
              >
                <ShoppingBag size={30} />
              </div>

              <h3 className="mt-10 text-6xl font-bold">

                {totalProducts}

              </h3>

              <p className="mt-3 text-gray-500">

                Products Available

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ShopHero;