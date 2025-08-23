package com.example.sdaia.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.example.sdaia.entities.Location;
import com.example.sdaia.entities.dto.LocationDTO;
import com.example.sdaia.repositories.LocationRepository;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

@ExtendWith(MockitoExtension.class)
public class LocationServiceTest {

  @Mock private LocationRepository locationRepository;

  @InjectMocks private LocationService locationService;

  private Location location1;
  private Location location2;
  private Location location3;

  @BeforeEach
  void setUp() {
    // setup
    location1 =
        Location.builder()
            .id(1L)
            .latitude(24.7257)
            .longitude(46.6696)
            .imageUrl("image1.jpg")
            .restaurantName("Restaurant 1")
            .build();

    location2 =
        Location.builder()
            .id(2L)
            .latitude(24.6643)
            .longitude(46.7354)
            .imageUrl("image2.jpg")
            .restaurantName("Restaurant 2")
            .build();

    location3 =
        Location.builder()
            .id(3L)
            .latitude(24.5098)
            .longitude(46.6169)
            .imageUrl("image3.jpg")
            .restaurantName("Test Restaurant")
            .build();
  }

  @Test
  void getAllLocations_ShouldReturnAllLocations() {
    // setup
    List<Location> locations = Arrays.asList(location1, location2, location3);
    when(locationRepository.findAll(any(Specification.class))).thenReturn(locations);

    // execute
    List<LocationDTO> result = locationService.getAllLocations(null);

    // Assert
    assertNotNull(result);
    assertEquals(3, result.size());
    assertEquals("Restaurant 1", result.get(0).getRestaurantName());
    assertEquals("Restaurant 2", result.get(1).getRestaurantName());
    assertEquals("Test Restaurant", result.get(2).getRestaurantName());

    verify(locationRepository).findAll(any(Specification.class));
  }

  @Test
  void getAllLocations_WithName_ShouldFilterByName() {
    // Arrange
    List<Location> locations = Arrays.asList(location3);
    when(locationRepository.findAll(any(Specification.class))).thenReturn(locations);

    // execute
    List<LocationDTO> result = locationService.getAllLocations("Test");

    // Assert
    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals("Test Restaurant", result.get(0).getRestaurantName());

    verify(locationRepository).findAll(any(Specification.class));
  }

  @Test
  void filterLocationByDistance_ShouldFilterByDistance() {
    // Arrange
    List<Location> locations = Arrays.asList(location1, location2, location3);
    when(locationRepository.findAll(any(Specification.class))).thenReturn(locations);

    // execute
    // Dirab coordinates, should only include location3 (also in Dirab)
    List<LocationDTO> result =
        locationService.filterLocationByDistance(24.5098, 46.6169, 1.0, null);

    // Assert
    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals("Test Restaurant", result.get(0).getRestaurantName());

    verify(locationRepository).findAll(any(Specification.class));
  }

  @Test
  void calculateDistance_ShouldReturnCorrectDistance_Riyadh() {
    // setup
    // Al Olaya
    double lat1 = 24.7257;
    double lon1 = 46.6696;
    // Al Malaz
    double lat2 = 24.6643;
    double lon2 = 46.7354;
    // Dirab
    double lat3 = 24.5098;
    double lon3 = 46.6169;

    Location olayaLocation =
        Location.builder()
            .id(1L)
            .latitude(lat1)
            .longitude(lon1)
            .imageUrl("olaya.jpg")
            .restaurantName("Olaya Restaurant")
            .build();

    Location malazLocation =
        Location.builder()
            .id(2L)
            .latitude(lat2)
            .longitude(lon2)
            .imageUrl("malaz.jpg")
            .restaurantName("Malaz Restaurant")
            .build();

    Location dirabLocation =
        Location.builder()
            .id(3L)
            .latitude(lat3)
            .longitude(lon3)
            .imageUrl("dirab.jpg")
            .restaurantName("Dirab Restaurant")
            .build();

    List<Location> locations = Arrays.asList(olayaLocation, malazLocation, dirabLocation);
    when(locationRepository.findAll(any(Specification.class))).thenReturn(locations);

    // Execute - small max distance (1 km)
    List<LocationDTO> resultSmallDistance =
        locationService.filterLocationByDistance(lat1, lon1, 1.0, null);

    // Assert - Only Olaya should be included
    assertEquals(1, resultSmallDistance.size());
    assertEquals("Olaya Restaurant", resultSmallDistance.get(0).getRestaurantName());

    // Execute - large max distance (10 km)
    List<LocationDTO> resultLargeDistance =
        locationService.filterLocationByDistance(lat1, lon1, 10.0, null);

    // Assert - Olaya and Malaz should be included
    assertEquals(2, resultLargeDistance.size());
    List<String> names = resultLargeDistance.stream().map(LocationDTO::getRestaurantName).toList();
    assertTrue(names.contains("Olaya Restaurant"));
    assertTrue(names.contains("Malaz Restaurant"));
  }
}
