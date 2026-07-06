import {
  ArrowUpRight,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description:
      "Enjoy free delivery on every order above ₹999 anywhere in India.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Changed your mind? Return your product within 7 days hassle-free.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description:
      "Every payment is protected with industry-grade encryption.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Questions? Our support team is always ready to help you.",
  },
];

export const ShopFeatures = () => {
  return (
    <section className="mt-28">

      {/* Heading */}

      <div className="mb-14 text-center">

        <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
          Why Shop With Us
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
          Shopping Made Better.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">
          Every order comes with premium service, secure checkout,
          and a shopping experience designed to feel effortless.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-gray-200
                bg-white
                p-8
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-black/10
                hover:shadow-2xl
              "
            >
              {/* Background Glow */}

              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-gray-100
                  opacity-0
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:opacity-100
                "
              />

              {/* Icon */}

              <div
                className="
                  relative
                  mb-8
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-black
                  text-white
                  transition-transform
                  duration-500
                  group-hover:scale-110
                  group-hover:rotate-6
                "
              >
                <Icon size={30} />
              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}

              <p className="mt-4 leading-7 text-gray-500">
                {feature.description}
              </p>

              {/* Bottom */}

              <div className="mt-10 flex items-center justify-between">

                <span className="text-sm font-semibold text-gray-900">
                  Learn More
                </span>

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    transition-all
                    duration-300
                    group-hover:bg-black
                    group-hover:text-white
                  "
                >
                  <ArrowUpRight
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
};