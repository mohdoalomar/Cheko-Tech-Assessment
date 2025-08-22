package com.example.sdaia.services;

import com.example.sdaia.entities.Location;
import com.example.sdaia.entities.dto.LocationDTO;
import com.example.sdaia.repositories.LocationRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LocationService {
  private final LocationRepository locationRepository;

  public List<LocationDTO> getAllLocations(String name) {
    Specification<Location> spec =
        (root, query, cb) ->
            name !=null ? cb.like(cb.lower(root.get("restaurantName")), "%" + name.toLowerCase() + "%") : cb.conjunction();
    return locationRepository.findAll(spec).stream().map(this::toDTO).toList();
  }

  public List<LocationDTO> filterLocationByDistance(
      double lat, double lon, double maxDistance, String name) {
    Specification<Location> spec =
        (root, query, cb) ->
                name !=null ? cb.like(cb.lower(root.get("restaurantName")), "%" + name.toLowerCase() + "%") : cb.conjunction();
    return locationRepository.findAll(spec).stream()
        .filter(
            location ->
                calculateDistance(lat, lon, location.getLatitude(), location.getLongitude())
                    < maxDistance)
        .map(this::toDTO).toList();
  }

  private LocationDTO toDTO(Location location) {
    return LocationDTO.builder()
            .id(location.getId())
        .latitude(location.getLatitude())
        .longitude(location.getLongitude())
        .imageUrl(location.getImageUrl())
        .restaurantName(location.getRestaurantName())
        .build();
  }

  private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    final int R = 6371;

    double latDistance = Math.toRadians(lat2 - lat1);
    double lonDistance = Math.toRadians(lon2 - lon1);

    double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
            + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
            * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
