package com.example.sdaia.entities.dto;

import com.example.sdaia.util.ItemCategory;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemDTO {
  private Long id;
  private String name;
  private String description;
  private String imageUrl;
  private ItemCategory category;
  private int calories;
  private Boolean isBestSeller;
  private int price;
}
