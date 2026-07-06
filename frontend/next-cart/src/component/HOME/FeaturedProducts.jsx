import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "../ProductCard";

const tabs = [
  "All",
  "Best Sellers",
  "New Arrivals",
  "Sale",
];

export const FeaturedProducts = ({ products = [] }) => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "Best Sellers":
        return products.filter((p) => p.bestSeller);

      case "New Arrivals":
        return products.filter((p) => p.newArrival);

      case "Sale":
        return products.filter((p) => p.oldPrice);

      default:
        return products;
    }
  }, [activeTab, products]);

  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[4px] text-gray-500">

              Featured Products

            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">

              Curated For You

            </h2>

            <p className="mt-4 max-w-xl text-gray-500">

              Hand-picked premium products crafted
              with quality and style.

            </p>

          </div>

          <Link
            to="/shop"
            className="group flex items-center gap-2 font-medium text-black"
          >
            View All

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />

          </Link>

        </div>

                {/* Tabs */}

        <div className="mt-14 flex gap-3 overflow-x-auto pb-2">

          {tabs.map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap
                rounded-full
                px-6
                py-3
                text-sm
                font-medium
                transition-all
                duration-300
                ${
                  activeTab === tab
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >

              {tab}

            </button>

          ))}

        </div>

                {/* Products */}

        <div
          className="
            mt-14
            flex
            gap-6
            overflow-x-auto
            snap-x
            snap-mandatory
            pb-4
            lg:grid
            lg:grid-cols-4
          "
        >

          {filteredProducts.slice(0, 8).map((product) => (

            <div
              key={product._id}
              className="
                min-w-[310px]
                snap-start
                lg:min-w-0
              "
            >

              <ProductCard
                product={product}
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

