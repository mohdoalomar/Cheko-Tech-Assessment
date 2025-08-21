import ThemeToggle from "./ThemeToggle";
import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import headerImage from "/headerImage.png";
import type { HeaderProps } from './types';

const Header = ({ isDarkMode, setIsDarkMode, activeTab, setActiveTab }: HeaderProps) => {
    return (
        <>
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            <header className="absolute top-0 right-20 h-36 w-full rounded-br-4xl bg-[#111216] p-4 text-white shadow-xl md:p-10 pt-0 pb-20">
                <img
                    src={headerImage}
                    alt="Abstract background"
                    className="absolute top-0 h-full w-full object-cover opacity-[7.5%] blur-lg"
                />
                <div className="container absolute top-0 left-52">
                    <div className="flex items-center justify-between">
                        <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
            </header>

            <SearchBar />
        </>
    );
};

export default Header;