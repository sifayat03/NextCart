import {
  
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-[#fafafa]">

      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Top */}

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-black
                text-xl
                font-bold
                text-white
              "
              >
                N
              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  NextCart

                </h2>

                <p className="text-sm text-gray-500">

                  Premium Shopping

                </p>

              </div>

            </div>

            <p
              className="
              mt-8
              max-w-md
              text-gray-500
              leading-8
            "
            >
              Discover premium products,
              seamless shopping and modern
              experiences crafted for everyday life.
            </p>

            {/* Social */}

            <div className="mt-10 flex gap-4">

              <a
                href="https://github.com/sifayat03"
                target="_blank"
                rel="noreferrer"
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-gray-300
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-black
                hover:bg-black
                hover:text-white
              "
              >
                Github
              </a>

              <a
                href="https://linkedin.com/in/sifayatali"
                target="_blank"
                rel="noreferrer"
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-gray-300
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-black
                hover:bg-black
                hover:text-white
              "
              >
                LinkedIn
              </a>

              <a
                href="#"
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-gray-300
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-black
                hover:bg-black
                hover:text-white
              "
              >
                Instagram
              </a>

            </div>

          </div>

          {/* Right */}

          <div className="grid grid-cols-3 gap-10">

            {/* Shop */}

            <div>

              <h3 className="font-semibold">

                Shop

              </h3>

              <div className="mt-6 space-y-4">

                <FooterLink
                  to="/shop"
                  title="Products"
                />

                <FooterLink
                  to="/shop"
                  title="Categories"
                />

                <FooterLink
                  to="/shop"
                  title="Collections"
                />

              </div>

            </div>

            {/* Company */}

            <div>

              <h3 className="font-semibold">

                Company

              </h3>

              <div className="mt-6 space-y-4">

                <FooterLink
                  to="/about"
                  title="About"
                />

                <FooterLink
                  to="/careers"
                  title="Careers"
                />

                <FooterLink
                  to="/blog"
                  title="Blog"
                />

              </div>

            </div>

            {/* Support */}

            <div>

              <h3 className="font-semibold">

                Support

              </h3>

              <div className="mt-6 space-y-4">

                <FooterLink
                  to="/contact"
                  title="Contact"
                />

                <FooterLink
                  to="/faq"
                  title="FAQ"
                />

                <FooterLink
                  to="/privacy"
                  title="Privacy"
                />

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div
          className="
          mt-20
          flex
          flex-col
          gap-5
          border-t
          border-gray-200
          pt-8
          text-sm
          text-gray-500
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
        >

          <p>

            © 2026 NextCart. All rights reserved.

          </p>

          <p>

            Crafted with ❤️ by

            <span className="ml-1 font-semibold text-black">

              Sifayat Ali

            </span>

          </p>

        </div>

      </div>

    </footer>
  );
};

const FooterLink = ({ to, title }) => {
  return (
    <Link
      to={to}
      className="
      group
      flex
      items-center
      gap-2
      text-gray-500
      transition
      hover:text-black
    "
    >
      {title}

      <ArrowUpRight
        size={16}
        className="
        opacity-0
        transition
        group-hover:opacity-100
      "
      />
    </Link>
  );
};

