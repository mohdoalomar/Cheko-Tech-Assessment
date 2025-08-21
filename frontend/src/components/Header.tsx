import {Moon, Search, SlidersHorizontal, Sun} from "lucide-react";

// @ts-ignore
const Header = ({ isDarkMode, setIsDarkMode, activeTab, setActiveTab }) => {


    // Function to toggle the theme
    const toggleTheme = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        if (newIsDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <header className="bg-gray-800 dark:bg-black p-4 md:p-6 relative text-white rounded-2xl shadow-xl">
            <div className="container mx-auto">
                {/* Top section with navigation and theme toggle */}
                <div className="flex justify-between items-center mb-6">
                    <nav className="flex items-center space-x-2 bg-gray-700/50 dark:bg-gray-900/50 p-1 rounded-full">
                        <button

                            onClick={() => setActiveTab('Home')}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                                activeTab === 'Home' ? 'bg-pink-200 text-pink-800' : 'text-gray-300 hover:bg-gray-600/50'
                            }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => setActiveTab('Map')}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                                activeTab === 'Map' ? 'bg-pink-200 text-pink-800' : 'text-gray-300 hover:bg-gray-600/50'
                            }`}
                        >
                            Map
                        </button>
                    </nav>

                    {/* Theme toggle*/}
                    <div
                        onClick={toggleTheme}
                        className="cursor-pointer w-9 h-20 bg-gray-700/50 dark:bg-gray-900/50 rounded-full p-1 flex flex-col justify-between items-center relative"
                    >
                        {/* Sliding circle */}
                        <div className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${isDarkMode ? 'translate-y-12' : 'translate-y-0'}`}></div>

                        {/* Icons */}
                        <div className="relative z-10 pt-0 flex items-center justify-center h-7 w-7">
                            <Sun size={16} className="text-yellow-400" />
                        </div>
                        <div className="relative z-10 pt-2 flex items-center justify-center h-7 w-7">
                            <Moon size={16} className="text-slate-400" />
                        </div>
                    </div>
                </div>

                {/* Search bar section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
                    {/* Search Input */}
                    <div className="flex-grow w-full flex items-center">
                        <Search className="text-gray-400 mx-3" size={20} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-700"></div>

                    {/* Filter Button */}
                    <button className="w-full md:w-auto flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                        <SlidersHorizontal className="mr-2" size={20} />
                        <span className="font-medium">Filter</span>
                    </button>

                    {/* Search Button */}
                    <button className="w-full md:w-auto bg-pink-300 text-pink-900 font-semibold px-6 py-3 rounded-lg hover:bg-pink-400 transition-colors duration-300">
                        Search
                    </button>
                </div>
            </div>
        </header>
    );
};
export default Header;