import { useEffect, useRef, useState } from "react";
import {
  User,
  Package,
  Heart,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const UserMenu = ({ user, logout }) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  const initial = user?.name?.charAt(0).toUpperCase() || "U";
  const firstName = user?.name?.split(" ")[0] || "User";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}

      <button
        onClick={() => setOpen(!open)}
        className={`
          group
          flex
          items-center
          gap-3
          rounded-full
          border
          bg-white
          px-2
          py-2
          transition-all
          duration-300
          ${
            open
              ? "border-blue-500 shadow-lg"
              : "border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md"
          }
        `}
      >
        {/* Avatar */}

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-blue-600
            to-indigo-600
            text-sm
            font-semibold
            text-white
            shadow-sm
          "
        >
          {initial}
        </div>

        {/* User Name */}

        <div className="hidden sm:flex flex-col items-start leading-none">

          <span className="text-sm font-semibold text-gray-900">
            {firstName}
          </span>

          <span className="mt-1 text-xs text-gray-500">
            Account
          </span>

        </div>

        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}

      <div
        className={`
          absolute
          right-0
          mt-4
          w-72
          origin-top-right
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-2
          shadow-xl
          transition-all
          duration-300
          ${
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }
        `}
      >
        {/* User Details */}

        <div className="flex items-center gap-4 rounded-xl p-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-blue-600
              to-indigo-600
              text-lg
              font-bold
              text-white
            "
          >
            {initial}
          </div>

          <div className="min-w-0">

            <h3 className="truncate font-semibold text-gray-900">
              {user.name}
            </h3>

            <p className="truncate text-sm text-gray-500">
              {user.email}
            </p>

          </div>

        </div>

        <div className="my-2 border-t border-gray-100"></div>

        {/* Menu Items */}

        <Link
          to="/profile"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-gray-100"
        >
          <User size={18} />
          My Profile
        </Link>

        <Link
          to="/orders"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-gray-100"
        >
          <Package size={18} />
          Orders
        </Link>

        <Link
          to="/wishlist"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-gray-100"
        >
          <Heart size={18} />
          Wishlist
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-gray-100"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        )}

        <div className="my-2 border-t border-gray-100"></div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

