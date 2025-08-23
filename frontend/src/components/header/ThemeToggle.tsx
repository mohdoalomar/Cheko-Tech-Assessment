import { Moon, Sun } from "lucide-react";
import type { HeaderProps } from "./types";

type ThemeToggleProps = Pick<HeaderProps, "isDarkMode" | "setIsDarkMode">;

const ThemeToggle = ({ isDarkMode, setIsDarkMode }: ThemeToggleProps) => {
  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="absolute right-7 top-4 z-50">
      <div className="mx-auto z-10 flex h-7 w-7 items-center justify-center pt-0">
        <Sun
          size={16}
          className={
            "font-extrabold" + isDarkMode ? "text-gray-600" : "text-cheko-black"
          }
        />
      </div>
      <div
        onClick={toggleTheme}
        className={`mx-auto flex h-12 w-6 cursor-pointer flex-col items-center justify-between rounded-full p-1 ${
          isDarkMode ? "bg-gray-600" : "bg-cheko-black "
        } `}
      >
        <div
          className={`h-4 w-4 rounded-full bg-cheko-pink shadow-md transition-transform duration-300 ease-in-out ${
            isDarkMode ? "translate-y-6" : "translate-y-0"
          }`}
        ></div>
      </div>
      <div className="mx-auto z-10 flex h-7 w-7 items-center justify-center pt-2">
        <Moon
          size={16}
          className={isDarkMode ? "text-gray-600" : "text-cheko-black"}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
