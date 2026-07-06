import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description:
      "Fast and free delivery on eligible orders.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description:
      "Your transactions are protected with industry-grade security.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Hassle-free returns within 7 days of delivery.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our team is always here to help whenever you need us.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="bg-[#fafafa] py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[4px] text-gray-500">

            Why NextCart

          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">

            Shopping Made Effortless

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-500">

            Every detail is designed to give you a seamless,
            secure and enjoyable shopping experience.

          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                group
                rounded-[28px]
                border
                border-gray-200
                bg-white
                p-8
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-black
                hover:shadow-2xl
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

                  <Icon size={30} />

                </div>

                <h3 className="mt-8 text-xl font-semibold">

                  {item.title}

                </h3>

                <p className="mt-4 leading-7 text-gray-500">

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
