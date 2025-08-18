package com.example.sdaia.services;

import com.example.sdaia.entities.Location;
import com.example.sdaia.entities.dto.LocationDTO;
import com.example.sdaia.repositories.LocationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public List<LocationDTO> getAllLocations() {
        return locationRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }
    public List<LocationDTO> searchLocationsByName(String name) {
        return locationRepository.findByRestaurantNameContainingIgnoreCase(name)
                .stream()
                .map(this::toDTO)
                .toList();
    }
    public List<LocationDTO> filterLocationByDistance(double lat, double lon, double maxDistance){
        locationRepository.findAll()
                .stream()
                .filter(location -> calculateDistance(lat, lon, location.getLatitude(), location.getLongitude()) < maxDistance)
                .map(this::toDTO);
        return null;
    }
    private Location toEntity(LocationDTO locationDTO){
        return Location.builder()
                .latitude(locationDTO.getLatitude())
                .longitude(locationDTO.getLongitude())
                .imageUrl(locationDTO.getImageUrl())
                .restaurantName(locationDTO.getRestaurantName())
                .build();
    }

    private LocationDTO toDTO(Location location){
        return LocationDTO.builder()
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .imageUrl(location.getImageUrl())
                .restaurantName(location.getRestaurantName())
                .build();
    }
    private double calculateDistance(double lat, double lon, double lat2, double lon2) {
        lat = Math.toRadians(lat);
        lon = Math.toRadians(lon);
        lat2 = Math.toRadians(lat2);
        lon2 = Math.toRadians(lon2);

        double y = Math.sin(lon2 - lon) * Math.cos(lat2);
        double x =
                Math.cos(lat) * Math.sin(lat2) - Math.sin(lat) * Math.cos(lat2) * Math.cos(lon2 - lon);

        double bearing = Math.atan2(y, x);

        return (Math.toDegrees(bearing) + 360) % 360;
    }
}
