import {
  Gem,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

const values = [
  {
    icon: Gem,
    title: "Quality",
    description:
      "Every product is carefully selected to meet our standards of quality and craftsmanship.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Every decision starts with one question — does it improve the customer experience?",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "Secure payments, transparent pricing and reliable service are at the core of everything we do.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We continuously refine our platform to create a faster, cleaner and more enjoyable shopping journey.",
  },
];

const Values = () => {
  return (
    <section className="bg-[#fafafa] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-600">

            Our Values

          </span>

          <h2 className="mt-8 text-5xl font-bold tracking-tight text-gray-900">

            The principles behind
            everything we build.

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">

            NextCart isn't just about products.
            It's about creating experiences that
            people genuinely enjoy and trust.

          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {values.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  rounded-[36px]
                  border
                  border-gray-200
                  bg-white
                  p-10
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-black
                  hover:shadow-xl
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
                  bg-gray-100
                  transition-all
                  duration-500
                  group-hover:bg-black
                  group-hover:text-white
                "
                >

                  <Icon size={28} />

                </div>

                <h3 className="mt-8 text-2xl font-semibold">

                  {item.title}

                </h3>

                <p className="mt-5 leading-8 text-gray-500">

                  {item.description}

                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Values;