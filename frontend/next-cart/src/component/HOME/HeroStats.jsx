import {
  Users,
  Star,
  Package,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "30K+",
    title: "Happy Customers",
    description: "Trusted by shoppers across India.",
  },
  {
    icon: Star,
    number: "4.9",
    title: "Customer Rating",
    description: "Thousands of positive reviews.",
  },
  {
    icon: Package,
    number: "500+",
    title: "Premium Products",
    description: "Curated collection of quality items.",
  },
  {
    icon: ShieldCheck,
    number: "100%",
    title: "Secure Checkout",
    description: "Safe payments with Razorpay.",
  },
];

export const HeroStats = () => {
  return (
    <section className="bg-white py-20">

      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                group
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-black
                hover:shadow-2xl
              "
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">

                <Icon size={28} />

              </div>

              <h2 className="text-4xl font-bold text-gray-900">

                {item.number}

              </h2>

              <h3 className="mt-3 text-lg font-semibold">

                {item.title}

              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">

                {item.description}

              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
};
