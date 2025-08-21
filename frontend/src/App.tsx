import Header from "./components/header/Header.tsx";
import {useState} from "react";
import Home from "./pages/home/Home";
import type {HeaderTabs} from "./components/header/types";
// Main App component to display the header
export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState<HeaderTabs>('Home');
    return (
        <div className={` ${isDarkMode?  "bg-cheko-dark-background": "bg-gray-100" } min-h-screen font-sans `}>
            <Header setIsDarkMode={setIsDarkMode} setActiveTab={setActiveTab} isDarkMode={isDarkMode} activeTab={activeTab} />

            <Home isDarkMode={isDarkMode}/>

        </div>
    )
}
