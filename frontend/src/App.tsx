import Header from "./components/Header.tsx";
import {useState} from "react";

// Main App component to display the header
export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <Header setIsDarkMode={setIsDarkMode} setActiveTab={setActiveTab} isDarkMode={isDarkMode} activeTab={activeTab} />
            <main className="mt-6 p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Page Content</h1>
                <p className="text-gray-600 dark:text-gray-400">This is where the rest of your page content would go.</p>
            </main>
        </div>
    )
}


