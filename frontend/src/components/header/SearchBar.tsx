import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="absolute left-32 top-[6.5rem] z-20 flex w-[87.5vw] flex-col items-center space-y-4 rounded-2xl bg-white px-2 shadow-lg md:flex-row md:space-y-0 md:space-x-75">
            {/* Search Input */}
            <div className="flex w-1/2 flex-grow items-center">
                <Search className="mx-3 text-cheko-black" size={20} />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent placeholder:text-cheko-black focus:outline-none"
                />
            </div>

            {/* Divider & Filter Button */}
            <div className="flex items-center justify-center md:justify-start">
                <div className="mx-1 hidden h-16 w-px bg-gray-200 dark:text-slate-400 md:block"></div>
                <button className="flex w-full items-center justify-center rounded-lg p-3 text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:w-auto">
                    <SlidersHorizontal className="mr-2" size={20} />
                    <span className="font-medium">Filter</span>
                </button>
            </div>

            {/* Search Button */}
            <button className="w-full rounded-lg bg-cheko-pink px-7 py-2.5 font-semibold text-black transition-colors duration-300 hover:bg-cheko-pink/75 md:w-auto">
                Search
            </button>
        </div>
    );
};

export default SearchBar;