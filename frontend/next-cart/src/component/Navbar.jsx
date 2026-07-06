import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingBag } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import { NavLink } from "./navbar/NavLink";
import { SearchBar } from "./navbar/SearchBar";
import { UserMenu } from "./navbar/UserMenu";
import { MobileMenu } from "./navbar/MobileMenu";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/verify-otp",
  ];

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/shop?search=${search}`);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-xl">

        {/* Top Header */}

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-lg font-bold text-white">

              N

            </div>

            <div>

              <h1 className="text-xl font-bold tracking-tight text-gray-900">

                NextCart

              </h1>

              <p className="text-xs text-gray-500">

                Premium Shopping

              </p>

            </div>

          </Link>

          {/* Desktop Nav */}

          <div className="hidden items-center gap-10 lg:flex">

            <NavLink to="/">Home</NavLink>

            <NavLink to="/shop">Shop</NavLink>

            <NavLink to="/cart">Cart</NavLink>

          </div>

          {/* Right */}

          <div className="flex items-center gap-3">

            {/* Desktop */}

            <div className="hidden lg:block">

              {user ? (
                <UserMenu
                  user={user}
                  logout={logout}
                />
              ) : (
                <Link
                  to="/login"
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Login
                </Link>
              )}

            </div>

            {/* Mobile Cart */}

            <Link
              to="/cart"
              className="relative rounded-full p-2 transition hover:bg-gray-100 lg:hidden"
            >
              <ShoppingBag size={24} />

              {/* Future Badge */}

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">

                5

              </span>

            </Link>

            {/* Mobile Menu */}

            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 transition hover:bg-gray-100 lg:hidden"
            >
              <Menu size={25} />
            </button>

          </div>

        </div>

                {/* Desktop Search */}

        <div className="hidden border-t border-gray-100 lg:block">

          <div className="mx-auto max-w-7xl px-5 py-4">

            <SearchBar
              className="mx-auto max-w-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSubmit={handleSearch}
            />

          </div>

        </div>

        {/* Mobile Search */}

        <div className="border-t border-gray-100 px-4 py-3 lg:hidden">

          <SearchBar
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSearch}
          />

        </div>

      </nav>

      <MobileMenu
        open={menuOpen}
        setOpen={setMenuOpen}
        user={user}
        logout={logout}
      />

    </>
  );
};