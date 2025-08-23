import { useState, useEffect, useCallback } from "react";
import type { Location } from "../pages/types";

export const useLocations = (searchTerm: string) => {
    const RIYADH_COORDS = { lat: 24.7136, lon: 46.6753 };
    const [locations, setLocations] = useState<Location[]>([]);
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [maxDistance, setMaxDistance] = useState<number>(5); // Default to 5km
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            () => {
                setUserLocation(RIYADH_COORDS);
            }
        );
    }, []);

    const fetchLocations = useCallback(
        async () => {
            if (!userLocation) return;

            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams({
                    lat: userLocation.lat.toString(),
                    lon: userLocation.lon.toString(),
                    max_distance: maxDistance.toString(),
                });

                if (searchTerm) {
                    params.append("restaurant_name", searchTerm);
                }

                const response = await fetch(
                    `http://localhost:8081/locations?${params.toString()}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data from the server.");
                }

                const data: Location[] = await response.json();
                setLocations(data);
            } catch (err) {
                setError("Failed to fetch restaurant locations.");
            } finally {
                setLoading(false);
            }
        },
        [userLocation, maxDistance, searchTerm]
    );

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    return { locations, loading, error, maxDistance, setMaxDistance, userLocation };
};
