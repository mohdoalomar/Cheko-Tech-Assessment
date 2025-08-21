import type { HeaderProps } from './types';

type NavigationBarProps = Pick<HeaderProps, 'activeTab' | 'setActiveTab'>;

const NavigationBar = ({ activeTab, setActiveTab }: NavigationBarProps) => {
    return (
        <nav className="z-20 flex items-center rounded-full">
            <button
                onClick={() => setActiveTab('Home')}
                className={`rounded-b-xl px-5 pb-2 pt-5 text-sm font-medium transition-colors duration-300 ${
                    activeTab === 'Home' ? 'bg-[#F4CBDF] text-black' : 'text-gray-300 hover:bg-gray-600/50'
                }`}
            >
                Home
            </button>
            <button
                onClick={() => setActiveTab('Map')}
                className={`rounded-b-xl px-5 pb-2 pt-5 text-sm font-medium transition-colors duration-300 ${
                    activeTab === 'Map' ? 'bg-[#F4CBDF] text-black' : 'text-gray-300 hover:bg-gray-600/50'
                }`}
            >
                Map
            </button>
        </nav>
    );
};

export default NavigationBar;