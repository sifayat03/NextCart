const stats = [
  {
    number: "30K+",
    title: "Happy Customers",
    description:
      "People trust NextCart for their everyday shopping.",
  },
  {
    number: "500+",
    title: "Premium Products",
    description:
      "Carefully curated collections across categories.",
  },
  {
    number: "4.9★",
    title: "Average Rating",
    description:
      "Loved by customers for quality and experience.",
  },
  {
    number: "99%",
    title: "Customer Satisfaction",
    description:
      "Because every detail matters.",
  },
];

const Stats = () => {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600">

            By The Numbers

          </span>

          <h2 className="mt-8 text-5xl font-bold tracking-tight text-gray-900">

            Trusted by Thousands.

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">

            Numbers don't tell the whole story,
            but they reflect our commitment to
            delivering an exceptional shopping experience.

          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item) => (

            <div
              key={item.title}
              className="
                rounded-[32px]
                border
                border-gray-200
                bg-[#fafafa]
                p-10
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-black
                hover:shadow-xl
              "
            >

              <h3 className="text-5xl font-bold tracking-tight">

                {item.number}

              </h3>

              <h4 className="mt-6 text-xl font-semibold">

                {item.title}

              </h4>

              <p className="mt-4 leading-8 text-gray-500">

                {item.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Stats;