package com.example.sdaia.controllers;

import com.example.sdaia.entities.dto.LocationDTO;
import com.example.sdaia.services.LocationService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class LocationController {
  LocationService locationService;

  @GetMapping("/locations")
  public List<LocationDTO> getLocations(
      @RequestParam(name = "restaurant_name", required = false) String name,
      @RequestParam (required = false) Double lat,
      @RequestParam (required = false) Double lon,
      @RequestParam(name = "max_distance", required = false) Double maxDistance) {
    return lat == null || lon == null || maxDistance == null
        ? locationService.getAllLocations(name)
        : locationService.filterLocationByDistance(lat, lon, maxDistance, name);
  }
}
