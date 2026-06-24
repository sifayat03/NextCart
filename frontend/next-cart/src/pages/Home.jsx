import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", icon: "📱" },
  { name: "Fashion", icon: "👕" },
  { name: "Shoes", icon: "👟" },
  { name: "Books", icon: "📚" },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    review: "Amazing products and super fast delivery.",
  },
  {
    name: "Priya Singh",
    review: "The wishlist and order tracking features are awesome.",
  },
  {
    name: "Aman Verma",
    review: "Best shopping experience I've had from a student-built app.",
  },
];

export const Home = () => {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">

      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <span className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full">
              🚀 Welcome To NextCart
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
              Shop Smarter
              <span className="text-orange-500">
                {" "}With NextCart
              </span>
            </h1>

            <p className="text-zinc-400 mt-6 text-lg">
              Discover premium products, unbeatable prices and
              a seamless shopping experience built for modern shoppers.
            </p>

            <div className="flex gap-4 mt-8">

              <Link
                to="/shop"
                className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl font-medium transition"
              >
                Shop Now
              </Link>

              <Link
                to="/register"
                className="border border-zinc-700 hover:border-orange-500 px-8 py-3 rounded-xl transition"
              >
                Get Started
              </Link>

            </div>

          </div>

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="shopping"
              className="rounded-3xl shadow-2xl w-full max-w-lg"
            />

          </div>

        </div>
      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Customers Love Us
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-zinc-900 p-6 rounded-2xl text-center">
            <h3 className="text-3xl mb-2">🚚</h3>
            <h4 className="font-semibold">Fast Delivery</h4>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl text-center">
            <h3 className="text-3xl mb-2">🔒</h3>
            <h4 className="font-semibold">Secure Payments</h4>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl text-center">
            <h3 className="text-3xl mb-2">💬</h3>
            <h4 className="font-semibold">24/7 Support</h4>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl text-center">
            <h3 className="text-3xl mb-2">⭐</h3>
            <h4 className="font-semibold">Top Rated Products</h4>
          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center mb-12">
          Shop By Category
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {categories.map((category) => (

            <Link
              key={category.name}
              to={`/shop?category=${category.name}`}
              className="bg-zinc-900 hover:bg-zinc-800 p-8 rounded-2xl text-center transition"
            >

              <div className="text-5xl mb-4">
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {category.name}
              </h3>

            </Link>

          ))}

        </div>

      </section>

      {/* FEATURED PRODUCTS PLACEHOLDER */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Products
        </h2>

        <div className="bg-zinc-900 rounded-2xl p-10 text-center">

          <p className="text-zinc-400">
            Connect your backend products here later.
          </p>

        </div>

      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-zinc-900 p-8 rounded-2xl text-center">
            <h3 className="text-4xl font-bold text-orange-500">
              10K+
            </h3>
            <p>Products</p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl text-center">
            <h3 className="text-4xl font-bold text-orange-500">
              5K+
            </h3>
            <p>Customers</p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl text-center">
            <h3 className="text-4xl font-bold text-orange-500">
              99%
            </h3>
            <p>Satisfaction</p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl text-center">
            <h3 className="text-4xl font-bold text-orange-500">
              24/7
            </h3>
            <p>Support</p>
          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center mb-12">
          What Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-zinc-900 p-6 rounded-2xl"
            >

              <p className="text-zinc-400">
                "{item.review}"
              </p>

              <h4 className="mt-4 font-semibold">
                - {item.name}
              </h4>

            </div>

          ))}

        </div>

      </section>

      {/* NEWSLETTER */}

      <section className="max-w-4xl mx-auto px-6 py-20">

        <div className="bg-zinc-900 rounded-3xl p-10 text-center">

          <h2 className="text-4xl font-bold">
            Stay Updated
          </h2>

          <p className="text-zinc-400 mt-3">
            Get latest deals and offers directly in your inbox.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-8">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
            />

            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl">
              Subscribe
            </button>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-zinc-800 py-8 text-center">

        <h3 className="text-2xl font-bold text-orange-500">
          NextCart
        </h3>

        <p className="text-zinc-500 mt-2">
          © 2026 NextCart. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
};