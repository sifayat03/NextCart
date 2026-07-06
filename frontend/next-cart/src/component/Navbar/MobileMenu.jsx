import { useEffect } from "react";
import {
  X,
  Home,
  Store,
  ShoppingBag,
  Heart,
  User,
  Package,
  LayoutDashboard,
  LogOut,
  Search,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const MobileMenu = ({
  open,
  setOpen,
  user,
  logout,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
      />

      {/* Sidebar */}

      <div className="fixed right-0 top-0 z-50 h-screen w-80 bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            Next<span className="text-blue-600">Cart</span>
          </h2>

          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>

        </div>

        {/* User */}

        {user && (
          <div className="flex items-center gap-4 border-b p-5">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-semibold text-white">

              {user.name.charAt(0).toUpperCase()}

            </div>

            <div>

              <h3 className="font-semibold">

                {user.name}

              </h3>

              <p className="text-sm text-gray-500">

                {user.email}

              </p>

            </div>

          </div>
        )}

        

        {/* Links */}

        <div className="space-y-1 px-3">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl p-4 hover:bg-gray-100"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            to="/shop"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl p-4 hover:bg-gray-100"
          >
            <Store size={20} />
            Shop
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl p-4 hover:bg-gray-100"
          >
            <ShoppingBag size={20} />
            Cart
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl p-4 hover:bg-gray-100"
          >
            <Heart size={20} />
            Wishlist
          </Link>

          {user && (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl p-4 hover:bg-gray-100"
              >
                <User size={20} />
                Profile
              </Link>

              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl p-4 hover:bg-gray-100"
              >
                <Package size={20} />
                Orders
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-4 hover:bg-gray-100"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl p-4 text-red-500 hover:bg-red-50"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          )}

          {!user && (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-black py-3 text-center font-medium text-white"
            >
              Login
            </Link>
          )}

        </div>

      </div>
    </>
  );
};

