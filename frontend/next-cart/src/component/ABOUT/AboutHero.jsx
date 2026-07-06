import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AboutHero = () => {
  return (
    <section className="bg-[#fafafa]">

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-20 px-6 py-24 lg:flex-row">

        {/* Left */}

        <div className="flex-1">

          <span className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm">

            About NextCart

          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-gray-900 lg:text-7xl">

            Crafting Premium
            <br />
            Shopping
            <br />
            Experiences.

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-500">

            At NextCart, we believe shopping should
            feel effortless, elegant and enjoyable.
            Every interaction is thoughtfully designed
            to make discovering products a seamless experience.

          </p>

          <Link
            to="/shop"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 font-medium text-white transition hover:scale-105"
          >
            Explore Products

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />

          </Link>

        </div>

        {/* Right */}

        <div className="relative flex flex-1 justify-center">

          <div className="absolute h-80 w-80 rounded-full bg-gray-200 blur-3xl"></div>

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
            alt="NextCart"
            className="relative z-10 w-[430px] rounded-[40px] shadow-2xl transition duration-700 hover:scale-105"
          />

        </div>

      </div>

    </section>
  );
};

