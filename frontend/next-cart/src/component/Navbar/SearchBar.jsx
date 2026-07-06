import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  className = "",
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className={className}
    >
      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search products..."
          className="
            h-12
            w-full
            rounded-full
            border
            border-gray-300
            bg-white
            pl-12
            pr-4
            text-sm
            shadow-sm
            outline-none
            transition-all
            duration-300
            placeholder:text-gray-400
            focus:border-black
            focus:ring-4
            focus:ring-gray-200
          "
        />

      </div>
    </form>
  );
};

