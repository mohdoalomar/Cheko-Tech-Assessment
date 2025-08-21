export type HeaderTabs = "Home" | "Map";

export interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
    activeTab: HeaderTabs;
    setActiveTab: (tab: HeaderTabs) => void;
}