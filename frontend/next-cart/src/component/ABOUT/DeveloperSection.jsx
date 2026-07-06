import {
  
  Globe,
  ArrowUpRight,
} from "lucide-react";

const DeveloperSection = () => {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600">

              Built by

            </span>

            <h2 className="mt-8 text-5xl font-bold tracking-tight">

              Sifayat Ali

            </h2>

            <p className="mt-4 text-xl text-gray-500">

              Full Stack Developer

            </p>

            <p className="mt-8 max-w-xl text-lg leading-9 text-gray-500">

              NextCart is more than an ecommerce
              application.

              It's a project built to explore
              scalable architecture, clean UI,
              seamless user experiences and
              modern web technologies using the
              MERN Stack.

            </p>

            <div className="mt-12 flex flex-wrap gap-4">

              <a
                href="https://sifayat.netlify.app"
                target="_blank"
                rel="noreferrer"
                className="
                group
                rounded-full
                bg-black
                px-7
                py-4
                text-white
                transition
                hover:scale-105
              "
              >

                <span className="flex items-center gap-2">

                  Portfolio

                  <ArrowUpRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />

                </span>

              </a>

              <a
                href="https://github.com/sifayat03"
                target="_blank"
                rel="noreferrer"
                className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-300
                px-7
                py-4
                transition
                hover:border-black
              "
              >

                

                GitHub

              </a>

              <a
                href="https://linkedin.com/in/sifayatali"
                target="_blank"
                rel="noreferrer"
                className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-300
                px-7
                py-4
                transition
                hover:border-black
              "
              >

                

                LinkedIn

              </a>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <div
              className="
              flex
              h-96
              w-96
              items-center
              justify-center
              rounded-[48px]
              bg-gradient-to-br
              from-black
              via-neutral-900
              to-neutral-800
              text-8xl
              font-bold
              tracking-widest
              text-white
              shadow-2xl
              transition-all
              duration-700
              hover:scale-105
              hover:rotate-2
            "
            >

              SA

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default DeveloperSection;