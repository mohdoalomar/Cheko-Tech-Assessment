package com.example.sdaia.entities;

import com.example.sdaia.util.ItemType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Item {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @NotNull String name;

  @NotNull String description;

  @NotNull String imageUrl;

  @NotNull ItemType type;

  @NotNull int calories;
  boolean isBestSeller;

  @NotNull int price;
}
