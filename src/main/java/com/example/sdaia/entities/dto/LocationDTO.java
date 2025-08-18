package com.example.sdaia.entities.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LocationDTO {
  private double latitude;
  private double longitude;
  private String imageUrl;
  private String restaurantName;
}
