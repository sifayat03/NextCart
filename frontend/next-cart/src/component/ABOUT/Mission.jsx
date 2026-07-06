export const Mission = () => {
  return (
    <section className="bg-[#fafafa] py-36">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <span className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm">

          Our Mission

        </span>

        <h2
          className="
          mt-10
          text-5xl
          font-bold
          leading-tight
          tracking-tight
          text-gray-900
          md:text-7xl
        "
        >
          To redefine
          <br />
          online shopping
          <br />
          through simplicity,
          <br />
          trust &
          thoughtful design.
        </h2>

        <p
          className="
          mx-auto
          mt-10
          max-w-3xl
          text-lg
          leading-9
          text-gray-500
        "
        >
          We believe technology should make shopping
          easier—not more complicated.
          Every feature, every interaction and every
          detail is carefully crafted to create a fast,
          secure and premium experience.
        </p>

        {/* Divider */}

        <div className="mx-auto mt-20 h-px w-40 bg-gradient-to-r from-transparent via-black to-transparent"></div>

        {/* Keywords */}

        <div
          className="
          mt-10
          flex
          flex-wrap
          justify-center
          gap-4
        "
        >

          {[
            "Quality",
            "Simplicity",
            "Innovation",
            "Trust",
          ].map((item) => (
            <span
              key={item}
              className="
              rounded-full
              border
              border-gray-300
              bg-white
              px-6
              py-3
              text-sm
              font-medium
              transition
              duration-300
              hover:border-black
              hover:bg-black
              hover:text-white
            "
            >
              {item}
            </span>
          ))}

        </div>

      </div>

    </section>
  );
};

