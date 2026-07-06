import { Link } from "react-router-dom";

const categories = [
  {
    title: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
  },
  {
    title: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
  },
  {
    title: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
  },
  {
    title: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  },
];

export const FeaturedCategories = () => {
  return (
    <section className="bg-[#fafafa] py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="text-sm font-medium uppercase tracking-[4px] text-gray-500">

            Categories

          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">

            Shop By Category

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-500">

            Explore carefully curated collections designed
            for every lifestyle.

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {categories.map((item) => (
            <Link
              key={item.title}
              to={`/shop?category=${item.title}`}
              className="group relative overflow-hidden rounded-[32px]"
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-8 left-8">

                <h3 className="text-3xl font-bold text-white">

                  {item.title}

                </h3>

                <span className="mt-3 inline-block rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition group-hover:bg-black group-hover:text-white">

                  Explore →

                </span>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
};

