package com.example.sdaia.controllers;

import com.example.sdaia.entities.dto.ItemDTO;
import com.example.sdaia.entities.dto.ItemPageResponseDTO;
import com.example.sdaia.services.ItemService;
import com.example.sdaia.util.ItemCategory;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/items")
public class ItemController {
  private final ItemService itemService;

  @GetMapping()
  public ItemPageResponseDTO getItems(
      @RequestParam(name = "search", required = false) String search,
      @RequestParam(name = "category", required = false) ItemCategory category,
      @RequestParam(name = "best_seller", required = false) Boolean bestSeller,
      @RequestParam(name = "sort_by", required = false, defaultValue = "price") String sort,
      @RequestParam(name = "ascending", required = false, defaultValue = "true") boolean ascending,
      @RequestParam(name = "page_size", required = false, defaultValue = "9") int pageSize,
      @RequestParam(name = "page_number", required = false, defaultValue = "0") int pageNumber) {
    return itemService.getAllItems(
        category, sort, ascending, bestSeller, search, pageSize, pageNumber);
  }

  @GetMapping("/second_highest_calorie")
  public Map<ItemCategory, ItemDTO> getSecondHighestCalorieItemPerCategory() {
    return itemService.getSecondHighestCalorieItemPerCategory();
  }
}
