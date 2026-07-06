import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div
          className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-neutral-950
          px-8
          py-24
          text-center
          lg:px-24
        "
        >

          {/* Glow */}

          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[140px]" />

          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-[140px]" />

          <div className="relative z-10">

            <span
              className="
              rounded-full
              bg-white/10
              px-5
              py-2
              text-sm
              text-white
            "
            >
              NextCart Experience
            </span>

            <h2
              className="
              mx-auto
              mt-8
              max-w-4xl
              text-5xl
              font-bold
              leading-tight
              text-white
            "
            >
              Ready to discover
              your next favorite product?
            </h2>

            <p
              className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-gray-300
            "
            >
              Premium products.
              Fast delivery.
              Beautiful shopping experience.
              Everything crafted for modern customers.
            </p>

            <Link
              to="/shop"
              className="
              mt-12
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-8
              py-4
              font-semibold
              text-black
              transition
              duration-300
              hover:scale-105
            "
            >
              Explore Collection

              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

