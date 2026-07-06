import { Link, useLocation } from "react-router-dom";

export const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();

  const active = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative inline-flex items-center text-[15px] font-medium text-gray-600 transition-colors duration-300 hover:text-gray-900"
    >
      {children}

      <span
        className={`absolute -bottom-1 left-0 h-[2px] bg-gray-900 transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
};

