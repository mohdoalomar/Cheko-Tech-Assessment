import { useRef, useEffect, useState } from "react";
import mapboxgl, { Marker, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oZG9hbG9tYXIiLCJhIjoiY2x2bzRwNWM0MGl6YzJqdGEyMXYwNjB5aSJ9.2W7ioqe6_GU-EGv_953Pxw";

interface MapComponentProps {
  locations: any[];
  initialCenter: { lat: number; lon: number };
  isDarkMode: boolean;
  userLocation: { lat: number; lon: number } | null;
}

export default function MapComponent({
  locations,
  initialCenter,
  isDarkMode,
  userLocation,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string | number, Marker>>(new Map());
  const activeMarkerRef = useRef<HTMLElement | null>(null);

  const defaultMarkerColor = isDarkMode ? "#AFB0B1" : "#A0AEC0";
  const selectedMarkerColor = "#F4CBDF";

  const defaultMarkerSVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='${encodeURIComponent(
    defaultMarkerColor
  )}'><path d='M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z'/><circle cx='12' cy='10' r='3' fill='white'/></svg>")`;
  const selectedMarkerSVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='${encodeURIComponent(
    selectedMarkerColor
  )}'><path d='M21 10c0 7-9 13-9 13S3 17 3 10a9 0 0 1 18 0z'/><circle cx='12' cy='10' r='3' fill='white'/></svg>")`;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isDarkMode
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11",
      center: [initialCenter.lon, initialCenter.lat],
      zoom: 12,
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      setMap(null);
    };
  }, []);

  useEffect(() => {
    if (!map || !userLocation) return;

    const userMarkerElement = document.createElement('div');
    userMarkerElement.className = 'user-location-marker';
    userMarkerElement.style.backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23ADD8E6'><circle cx='12' cy='12' r='8'/></svg>")`;
    userMarkerElement.style.width = '24px';
    userMarkerElement.style.height = '24px';
    userMarkerElement.style.backgroundSize = 'contain';
    userMarkerElement.style.backgroundRepeat = 'no-repeat';
    userMarkerElement.style.animation = 'pulse 3s infinite';

    new Marker(userMarkerElement)
      .setLngLat([userLocation.lon, userLocation.lat])
      .setPopup(new Popup({ offset: 25 }).setText('Your Location'))
      .addTo(map);

  }, [map, userLocation]);

  const drawMarkers = () => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();
    activeMarkerRef.current = null;

    locations.forEach((loc) => {
      const popupContent = `
      <div class="flex items-center gap-3 font-sans">
        <img src="${loc.imageUrl}" alt="${loc.restaurantName}" class="w-16 h-16 object-cover rounded-xl" />
        <div><h3 class="m-0 font-bold text-base text-gray-900">${loc.restaurantName}</h3></div>
      </div>`;

      const popup = new Popup({ offset: 25, closeButton: false }).setHTML(
        popupContent
      );

      const el = document.createElement("div");
      el.className = "w-6 h-6 cursor-pointer";

      const iconEl = document.createElement("div");
      iconEl.className =
        "w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-150 ease-in-out origin-bottom";
      iconEl.style.backgroundImage = defaultMarkerSVG;
      el.appendChild(iconEl);

      el.addEventListener(
        "mouseenter",
        () => (iconEl.style.transform = "scale(1.2)")
      );
      el.addEventListener(
        "mouseleave",
        () => (iconEl.style.transform = "scale(1)")
      );

      el.addEventListener("click", () => {
        if (activeMarkerRef.current) {
          const oldIcon = activeMarkerRef.current.firstChild as HTMLElement;
          if (oldIcon) oldIcon.style.backgroundImage = defaultMarkerSVG;
        }
        iconEl.style.backgroundImage = selectedMarkerSVG;
        activeMarkerRef.current = el;
      });

      const marker = new Marker({ element: el, offset: [0, -12] })
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.set(loc.id, marker);
    });
  };
  useEffect(() => {
    if (!map) return;
    if (!map.loaded()) {
      map.once("load", drawMarkers);
    } else {
      drawMarkers();
    }
  }, [map, locations, defaultMarkerSVG, selectedMarkerSVG]);

  useEffect(() => {
    if (!map) return;
    map.setStyle(
      isDarkMode
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11"
    );

    map.once("style.load", () => {
      drawMarkers();
    });
  }, [isDarkMode, map, locations, defaultMarkerSVG, selectedMarkerSVG]);

  return (
    <>
      <style>
        {`
                  .mapboxgl-popup-content {
                    padding: 1rem !important;
                    border-radius: 1rem !important;
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
                  }
                `}
      </style>
      <div ref={mapContainerRef} className="h-full w-full" />
    </>
  );
}
