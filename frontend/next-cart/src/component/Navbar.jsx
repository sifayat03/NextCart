import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";


export const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();


  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");


  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/verify-otp"
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/shop?search=${search}`);
  };

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-orange-500"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0451/5325/files/checkout_logo_19.png?height=628&pad_color=fff&v=1613154548&width=1200"
              alt="NextCart"
              className="h-10 w-10 rounded-lg"
            />
            NextCart
          </Link>

          {/* Search Bar Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xl mx-8"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-r-lg"
            >
              Search
            </button>
          </form>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">

            <Link  to="/shop" className="hover:text-orange-500" >    Shop   </Link>

            <Link   to="/cart"  className="hover:text-orange-500"   >  Cart    </Link>

            {user ? (
              <>
                <Link to="/profile"    className="hover:text-orange-500" >   Hi, {user.name}  </Link>

                {user.role === "admin" && (
                  <Link   to="/admin" className="hover:text-orange-500"   >  Admin   </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden text-2xl"
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="md:hidden py-4 border-t">

            <form
              onSubmit={handleSearch}
              className="flex mb-4"
            >
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 border rounded-l-lg px-3 py-2"
              />

              <button
                type="submit"
                className="bg-orange-500 text-white px-4 rounded-r-lg"
              >
                Go
              </button>
            </form>

            <div className="flex flex-col gap-3">

              <Link
                to="/shop"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Shop
              </Link>

              <Link
                to="/cart"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Cart
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >
                    Hi, {user.name}
                  </Link>

                  

                  {user.role === "admin" && (
                    <Link
                      to="/admin/orders"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="bg-orange-500 text-white py-2 text-center rounded-lg"
                >
                  Login
                </Link>
              )}

            </div>

          </div>
        )}

      </div>

    </nav>
  );
};