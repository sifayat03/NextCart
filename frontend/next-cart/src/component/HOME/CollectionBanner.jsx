import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CollectionBanner = () => {
  return (
    <section className="bg-white py-28">

      <div
        className="
        relative
        mx-auto
        max-w-7xl
        overflow-hidden
        rounded-[40px]
        bg-gradient-to-br
        from-neutral-950
        via-neutral-900
        to-neutral-800
        px-8
        py-20
        lg:px-20
      "
      >

        {/* Background Glow */}

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span
              className="
              rounded-full
              bg-white/10
              px-5
              py-2
              text-sm
              text-white
              backdrop-blur
            "
            >
              New Collection 2026
            </span>

            <h2
              className="
              mt-8
              text-5xl
              font-bold
              leading-tight
              text-white
              lg:text-6xl
            "
            >
              Crafted For
              <br />
              Modern Lifestyle
            </h2>

            <p
              className="
              mt-8
              max-w-lg
              text-lg
              leading-8
              text-gray-300
            "
            >
              Discover premium products carefully
              selected to make everyday shopping
              effortless and enjoyable.
            </p>

            <Link
              to="/shop"
              className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-8
              py-4
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-105
            "
            >
              Shop Collection

              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />

            </Link>

          </div>

          {/* Right */}

          <div className="relative flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
              alt="Collection"
              className="
              h-[480px]
              object-contain
              transition-all
              duration-700
              hover:scale-110
              hover:-rotate-3
            "
            />

          </div>

        </div>

      </div>

    </section>
  );
};

