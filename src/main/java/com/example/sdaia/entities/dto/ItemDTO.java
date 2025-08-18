package com.example.sdaia.entities.dto;

import com.example.sdaia.util.ItemCategory;
import lombok.Data;

@Data
public class ItemDTO {
  private String name;
  private String description;
  private String imageUrl;
  private ItemCategory category;
  private int calories;
  private boolean isBestSeller;
  private int price;
}
