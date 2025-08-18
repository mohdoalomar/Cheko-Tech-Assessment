package com.example.sdaia.entities;

import com.example.sdaia.util.ItemCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Item {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotNull private String name;
  @NotNull private String description;
  @NotNull private String imageUrl;
  @NotNull private ItemCategory category;
  @NotNull private int calories;
  private boolean isBestSeller = false;
  @NotNull private int price;
}
