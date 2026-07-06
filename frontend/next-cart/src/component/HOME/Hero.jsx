import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="bg-[#fafafa]">

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 px-6 py-20 lg:flex-row">

        {/* Left */}

        <div className="flex-1">

          <span className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">

            ✨ New Collection 2026

          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-gray-900 lg:text-7xl">

            Premium Shopping
            <br />

            Designed for
            <br />

            Modern Living.

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-500">

            Discover curated products crafted with
            premium quality, elegant design and
            seamless shopping experience.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/shop"
              className="group flex items-center gap-2 rounded-full bg-black px-7 py-4 font-medium text-white transition hover:scale-105"
            >
              Shop Collection

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            </Link>

            <Link
              to="/shop"
              className="rounded-full border border-gray-300 bg-white px-7 py-4 font-medium transition hover:border-black"
            >
              Explore
            </Link>

          </div>

        </div>

        {/* Right */}

        <div className="relative flex flex-1 justify-center">

          {/* Glow */}

          <div className="absolute h-80 w-80 rounded-full bg-gray-200 blur-3xl"></div>

          {/* Product */}

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
            alt="Hero Product"
            className="relative z-10 w-[420px] rounded-[40px] object-cover shadow-2xl"
          />

        </div>

      </div>

    </section>
  );
};

