import Header from "./components/header/Header.tsx";
import { useState } from "react";
import Home from "./pages/home/Home";
import Map from "./pages/map/Map.tsx";
import type { HeaderTabs } from "./components/header/types";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<HeaderTabs>("Home");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div
      className={` ${
        isDarkMode ? "bg-cheko-dark-background" : "bg-gray-100"
      } min-h-screen font-sans `}
    >
      <Header
        setIsDarkMode={setIsDarkMode}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        activeTab={activeTab}
        setIsFilterOpen={setIsFilterOpen}
        setSearchTerm={setSearchTerm}
      />

      {activeTab == "Home" ? (
        <Home
          isDarkMode={isDarkMode}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          searchTerm={searchTerm}
        />
      ) : (
        <Map
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          searchTerm={searchTerm}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
