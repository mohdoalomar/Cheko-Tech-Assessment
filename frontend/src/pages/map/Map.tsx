import { useLocations } from '../../hooks/useLocations';
import MapComponent from './MapComponent';
import MapFilter from '../../components/header/MapFilter.tsx';

// This would come from your Header component via a shared state (e.g., Zustand, Context, or lifted state in App.tsx)
interface MapPageProps {
    searchTerm: string;
    isFilterOpen: boolean;
    setIsFilterOpen: (isOpen: boolean) => void;
    isDarkMode: boolean;
}

export default function MapPage({ searchTerm, isFilterOpen, setIsFilterOpen, isDarkMode }: MapPageProps) {
    const { locations, loading, error, maxDistance, setMaxDistance, userLocation } = useLocations(searchTerm);


    if (loading && userLocation === null) {
        return <div className="flex items-center justify-center h-screen"><p>Loading Map...</p></div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen"><p className="text-red-500">{error}</p></div>;
    }

    if (!userLocation) {
        return <div className="flex items-center justify-center h-screen"><p>Getting your location...</p></div>;
    }

    return (
        <div className="mx-auto" style={{ position: 'relative', width: '99vw', height: 'calc(99vh - 160px)' }}>
            <MapComponent locations={locations} initialCenter={userLocation} isDarkMode={isDarkMode}  />
            <MapFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                currentDistance={maxDistance}
                onApplyFilter={setMaxDistance}
            />
        </div>
    );
}