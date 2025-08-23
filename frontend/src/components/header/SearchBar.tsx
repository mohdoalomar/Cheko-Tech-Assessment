import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { HeaderProps } from "./types.ts";

type searchProps = Pick<
  HeaderProps,
  "isDarkMode" | "setIsFilterOpen" | "setSearchTerm"
>;

export default function SearchBar({
  isDarkMode,
  setIsFilterOpen,
  setSearchTerm,
}: searchProps) {
  const [search, setSearch] = useState("");
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  return (
    <div
      className={`absolute md:left-32 left-14 top-[6.5rem] z-20 flex w-[65%] lg:w-[80%] xl:w-{90%] flex-col items-center space-y-4 rounded-2xl ${
        isDarkMode ? "bg-cheko-search-gray" : " bg-white"
      } px-2 shadow-lg flex-row md:space-y-0 lg:space-x-65 xl:space-x-100`}
    >
      {/* Search Input */}
      <div className="flex w-1/2 flex-grow items-center my-auto">
        <Search className="mx-3 text-cheko-black" size={20} />
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className={`w-full bg-transparent ${
            isDarkMode
              ? "placeholder:text-white"
              : "placeholder:text-cheko-black"
          } focus:outline-none`}
        />
      </div>

      {/* Divider & Filter Button */}
      <div className="flex items-center  max-sm:h-10 justify-start">
        <div className="mx-1 hidden h-16 w-px bg-gray-200 dark:text-slate-400 md:block"></div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className={`flex max-sm:hidden w-full items-center justify-center rounded-lg p-3 ${
            isDarkMode ? "text-white" : "text-cheko-black"
          } transition-colors duration-300 hover:bg-cheko-pink/75 md:w-auto`}
        >
          <SlidersHorizontal className="mr-2" size={20} />
          <span className="font-medium">Filter</span>
        </button>
      </div>

      {/* Search Button */}
      <button
        onClick={() => setSearchTerm(search)}
        className=" max-sm:scale-90 rounded-lg bg-cheko-pink px-7 py-2.5 font-semibold text-black transition-colors duration-300 hover:bg-cheko-pink/75 w-auto"
      >
        Search
      </button>
    </div>
  );
}
