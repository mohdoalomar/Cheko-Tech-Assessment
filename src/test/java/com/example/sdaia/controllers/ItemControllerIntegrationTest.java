package com.example.sdaia.controllers;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.sdaia.entities.dto.ItemDTO;
import com.example.sdaia.entities.dto.ItemPageResponseDTO;
import com.example.sdaia.services.ItemService;
import com.example.sdaia.util.ItemCategory;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = ItemController.class)
public class ItemControllerIntegrationTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private ItemService itemService;

  @Test
  void getItems_ShouldReturnItemPageResponseDTO() throws Exception {
    ItemDTO item1 =
        ItemDTO.builder()
            .id(1L)
            .name("Test Item 1")
            .description("Description 1")
            .imageUrl("image1.jpg")
            .category(ItemCategory.BREAKFAST)
            .calories(200)
            .isBestSeller(true)
            .price(10)
            .build();

    ItemDTO item2 =
        ItemDTO.builder()
            .id(2L)
            .name("Test Item 2")
            .description("Description 2")
            .imageUrl("image2.jpg")
            .category(ItemCategory.DRINK)
            .calories(150)
            .isBestSeller(false)
            .price(5)
            .build();

    List<ItemDTO> items = Arrays.asList(item1, item2);
    Page<ItemDTO> itemPage = new PageImpl<>(items);

    Map<ItemCategory, Long> counts = new HashMap<>();
    counts.put(ItemCategory.BREAKFAST, 1L);
    counts.put(ItemCategory.DRINK, 1L);
    counts.put(ItemCategory.SOUP, 0L);
    counts.put(ItemCategory.SUSHI, 0L);
    counts.put(ItemCategory.OTHER, 0L);

    ItemPageResponseDTO responseDTO =
        ItemPageResponseDTO.builder().items(itemPage).counts(counts).build();

    when(itemService.getAllItems(any(), any(), any(), any(), any(), anyInt(), anyInt()))
        .thenReturn(responseDTO);

    mockMvc
        .perform(
            get("/items")
                .param("category", "BREAKFAST")
                .param("sort_by", "price")
                .param("ascending", "true")
                .param("best_seller", "true")
                .param("search", "test")
                .param("page_size", "10")
                .param("page_number", "0"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.items.content", hasSize(2)))
        .andExpect(jsonPath("$.items.content[0].name", is("Test Item 1")))
        .andExpect(jsonPath("$.items.content[1].name", is("Test Item 2")))
        .andExpect(jsonPath("$.counts.BREAKFAST", is(1)))
        .andExpect(jsonPath("$.counts.DRINK", is(1)));
  }

  @Test
  void getSecondHighestCalorieItemPerCategory_ShouldReturnMapOfItems() throws Exception {
    ItemDTO breakfastItem =
        ItemDTO.builder()
            .id(1L)
            .name("Breakfast Item")
            .description("Description")
            .imageUrl("image1.jpg")
            .category(ItemCategory.BREAKFAST)
            .calories(200)
            .isBestSeller(true)
            .price(10)
            .build();

    ItemDTO drinkItem =
        ItemDTO.builder()
            .id(2L)
            .name("Drink Item")
            .description("Description")
            .imageUrl("image2.jpg")
            .category(ItemCategory.DRINK)
            .calories(150)
            .isBestSeller(false)
            .price(5)
            .build();

    Map<ItemCategory, ItemDTO> itemMap = new HashMap<>();
    itemMap.put(ItemCategory.BREAKFAST, breakfastItem);
    itemMap.put(ItemCategory.DRINK, drinkItem);
    itemMap.put(ItemCategory.SOUP, null);
    itemMap.put(ItemCategory.SUSHI, null);
    itemMap.put(ItemCategory.OTHER, null);

    when(itemService.getSecondHighestCalorieItemPerCategory()).thenReturn(itemMap);

    mockMvc
        .perform(get("/item/second_highest_calorie"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.BREAKFAST.name", is("Breakfast Item")))
        .andExpect(jsonPath("$.DRINK.name", is("Drink Item")))
        .andExpect(jsonPath("$.SOUP").doesNotExist())
        .andExpect(jsonPath("$.SUSHI").doesNotExist())
        .andExpect(jsonPath("$.OTHER").doesNotExist());
  }
}
