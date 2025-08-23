package com.example.sdaia.controllers;

import com.example.sdaia.entities.dto.LocationDTO;
import com.example.sdaia.services.LocationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LocationController.class)
public class LocationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LocationService locationService;


    @Test
    void getLocations_ShouldReturnAllLocations() throws Exception {
        LocationDTO location1 = LocationDTO.builder()
                .id(1L)
                .latitude(37.7749)
                .longitude(-122.4194)
                .imageUrl("image1.jpg")
                .restaurantName("Restaurant 1")
                .build();

        LocationDTO location2 = LocationDTO.builder()
                .id(2L)
                .latitude(34.0522)
                .longitude(-118.2437)
                .imageUrl("image2.jpg")
                .restaurantName("Restaurant 2")
                .build();

        List<LocationDTO> locations = Arrays.asList(location1, location2);

        when(locationService.getAllLocations(null)).thenReturn(locations);

        mockMvc.perform(get("/locations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].restaurantName", is("Restaurant 1")))
                .andExpect(jsonPath("$[1].restaurantName", is("Restaurant 2")));
    }

    @Test
    void getLocations_WithName_ShouldFilterByName() throws Exception {
        // Arrange
        LocationDTO location = LocationDTO.builder()
                .id(3L)
                .latitude(40.7128)
                .longitude(-74.0060)
                .imageUrl("image3.jpg")
                .restaurantName("Test Restaurant")
                .build();

        List<LocationDTO> locations = Collections.singletonList(location);

        when(locationService.getAllLocations("Test")).thenReturn(locations);

        // Act & Assert
        mockMvc.perform(get("/locations")
                .param("restaurant_name", "Test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].restaurantName", is("Test Restaurant")));
    }

    @Test
    void getLocations_WithCoordinates_ShouldFilterByDistance() throws Exception {
        // Arrange
        LocationDTO location = LocationDTO.builder()
                .id(1L)
                .latitude(37.7749)
                .longitude(-122.4194)
                .imageUrl("image1.jpg")
                .restaurantName("Restaurant 1")
                .build();

        List<LocationDTO> locations = Collections.singletonList(location);

        when(locationService.filterLocationByDistance(37.7749, -122.4194, 10.0, null))
                .thenReturn(locations);

        // Act & Assert
        mockMvc.perform(get("/locations")
                .param("lat", "37.7749")
                .param("lon", "-122.4194")
                .param("max_distance", "10.0"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].restaurantName", is("Restaurant 1")));
    }

    @Test
    void getLocations_WithCoordinatesAndName_ShouldFilterByDistanceAndName() throws Exception {
        // Arrange
        LocationDTO location = LocationDTO.builder()
                .id(3L)
                .latitude(40.7128)
                .longitude(-74.0060)
                .imageUrl("image3.jpg")
                .restaurantName("Test Restaurant")
                .build();

        List<LocationDTO> locations = Collections.singletonList(location);

        when(locationService.filterLocationByDistance(40.7128, -74.0060, 10.0, "Test"))
                .thenReturn(locations);

        // Act & Assert
        mockMvc.perform(get("/locations")
                .param("lat", "40.7128")
                .param("lon", "-74.0060")
                .param("max_distance", "10.0")
                .param("restaurant_name", "Test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].restaurantName", is("Test Restaurant")));
    }
}