import { Sparkles } from "lucide-react";

export const OurStory = () => {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* Left */}

        <div>

          <span className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600">

            Our Story

          </span>

          <h2 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-gray-900">

            Built with
            <br />
            Simplicity in Mind.

          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-500">

            NextCart began with a simple vision —
            online shopping should feel clean,
            intuitive and enjoyable.

          </p>

          <p className="mt-6 text-lg leading-9 text-gray-500">

            Instead of overwhelming users with
            cluttered interfaces, we focused on
            elegant design, seamless navigation
            and carefully curated products.

          </p>

          <p className="mt-6 text-lg leading-9 text-gray-500">

            Every screen, every interaction and
            every animation has been thoughtfully
            crafted to create a shopping experience
            people genuinely enjoy.

          </p>

        </div>

        {/* Right */}

        <div
          className="
          relative
          overflow-hidden
          rounded-[36px]
          border
          border-gray-200
          bg-gradient-to-br
          from-white
          to-gray-100
          p-10
          shadow-xl
        "
        >

          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-blue-100 blur-3xl"></div>

          <div className="relative z-10">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">

              <Sparkles size={30} />

            </div>

            <p className="mt-12 text-sm uppercase tracking-[5px] text-gray-400">

              Journey

            </p>

            <h3 className="mt-4 text-4xl font-bold">

              2026

            </h3>

            <div className="mt-10 space-y-10">

              <div className="flex gap-5">

                <div className="mt-2 h-3 w-3 rounded-full bg-black"></div>

                <div>

                  <h4 className="font-semibold">

                    Idea Born

                  </h4>

                  <p className="mt-2 text-gray-500">

                    Started with the vision of building
                    a premium shopping platform.

                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="mt-2 h-3 w-3 rounded-full bg-black"></div>

                <div>

                  <h4 className="font-semibold">

                    First Prototype

                  </h4>

                  <p className="mt-2 text-gray-500">

                    Designed a clean, modern shopping
                    experience inspired by Apple.

                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="mt-2 h-3 w-3 rounded-full bg-black"></div>

                <div>

                  <h4 className="font-semibold">

                    NextCart Launch

                  </h4>

                  <p className="mt-2 text-gray-500">

                    Ready to deliver a premium
                    ecommerce experience.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

