package com.example.sdaia.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import com.example.sdaia.entities.Item;
import com.example.sdaia.entities.dto.ItemDTO;
import com.example.sdaia.entities.dto.ItemPageResponseDTO;
import com.example.sdaia.repositories.ItemRepository;
import com.example.sdaia.util.ItemCategory;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

@ExtendWith(MockitoExtension.class)
public class ItemServiceTest {

  @Mock private ItemRepository itemRepository;

  @InjectMocks private ItemService itemService;

  private Item item1;
  private Item item2;
  private Item item3;
  private Item emptyItem;

  @BeforeEach
  void setUp() {
    item1 =
        Item.builder()
            .id(1L)
            .name("Test Item 1")
            .description("Description 1")
            .imageUrl("image1.jpg")
            .category(ItemCategory.BREAKFAST)
            .calories(200)
            .isBestSeller(true)
            .price(10)
            .build();

    item2 =
        Item.builder()
            .id(2L)
            .name("Test Item 2")
            .description("Description 2")
            .imageUrl("image2.jpg")
            .category(ItemCategory.DRINK)
            .calories(150)
            .isBestSeller(false)
            .price(5)
            .build();

    item3 =
        Item.builder()
            .id(3L)
            .name("Test Item 3")
            .description("Description 3")
            .imageUrl("image3.jpg")
            .category(ItemCategory.BREAKFAST)
            .calories(300)
            .isBestSeller(false)
            .price(15)
            .build();

    emptyItem =
        Item.builder()
            .id(0L)
            .name("")
            .description("")
            .imageUrl("")
            .category(ItemCategory.OTHER)
            .calories(0)
            .isBestSeller(false)
            .price(0)
            .build();
  }

  @Test
  void getAllItems_ShouldReturnItemPageResponseDTO() {
    // setup
    List<Item> items = Arrays.asList(item1, item2);
    Page<Item> itemPage = new PageImpl<>(items);
    when(itemRepository.findAll(any(Specification.class), any(Pageable.class)))
        .thenReturn(itemPage);
    when(itemRepository.count(any(Specification.class))).thenReturn(2L);

    // execute
    ItemPageResponseDTO result =
        itemService.getAllItems(ItemCategory.BREAKFAST, "price", true, true, "test", 10, 0);

    // Assert
    assertNotNull(result);
    assertEquals(2, result.getItems().getContent().size());
    assertEquals(5, result.getCounts().size()); // One count for each category

    verify(itemRepository).findAll(any(Specification.class), any(Pageable.class));
    verify(itemRepository, times(5)).count(any(Specification.class));
  }

  @Test
  void getSecondHighestCalorieItemPerCategory_ShouldReturnMapOfItems() {
    // setup
    when(itemRepository.findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.BREAKFAST)))
        .thenReturn(item1);
    when(itemRepository.findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.DRINK)))
        .thenReturn(item2);
    when(itemRepository.findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.SOUP)))
        .thenReturn(emptyItem); // Use empty item instead of null
    when(itemRepository.findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.SUSHI)))
        .thenReturn(emptyItem); // Use empty item instead of null
    when(itemRepository.findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.OTHER)))
        .thenReturn(emptyItem); // Use empty item instead of null

    // execute
    Map<ItemCategory, ItemDTO> result = itemService.getSecondHighestCalorieItemPerCategory();

    // Assert
    assertNotNull(result);
    assertEquals(5, result.size()); // One entry for each category
    assertNotNull(result.get(ItemCategory.BREAKFAST));
    assertNotNull(result.get(ItemCategory.DRINK));

    verify(itemRepository).findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.BREAKFAST));
    verify(itemRepository).findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.DRINK));
    verify(itemRepository).findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.SOUP));
    verify(itemRepository).findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.SUSHI));
    verify(itemRepository).findTheSecondHighestCaloryItemForACategory(eq(ItemCategory.OTHER));
  }

  @Test
  void getItemsPage_ShouldReturnPageOfItemDTOs() {
    // setup
    List<Item> items = Arrays.asList(item1, item2);
    Page<Item> itemPage = new PageImpl<>(items);

    when(itemRepository.findAll(any(Specification.class), any(Pageable.class)))
        .thenReturn(itemPage);

    // execute
    Specification<Item> spec = (root, query, cb) -> cb.conjunction();
    Page<ItemDTO> result = itemService.getItemsPage("price", true, 10, 0, spec);

    // Assert
    assertNotNull(result);
    assertEquals(2, result.getContent().size());
    assertEquals("Test Item 1", result.getContent().get(0).getName());
    assertEquals("Test Item 2", result.getContent().get(1).getName());

    verify(itemRepository).findAll(any(Specification.class), any(Pageable.class));
  }

  @Test
  void countItemsByCategory_ShouldReturnMapOfCounts() {
    // setup
    Map<ItemCategory, Long> expectedCounts = new HashMap<>();
    for (ItemCategory category : ItemCategory.values()) {
      expectedCounts.put(category, 2L);
    }
    doAnswer(
            invocation -> {
              Specification<Item> spec = invocation.getArgument(0);
              return 2L;
            })
        .when(itemRepository)
        .count(any(Specification.class));

    // execute
    Specification<Item> spec = (root, query, cb) -> cb.conjunction();
    Map<ItemCategory, Long> result = itemService.countItemsByCategory(spec);

    // Assert
    assertNotNull(result);
    assertEquals(5, result.size());
    assertEquals(2L, result.get(ItemCategory.BREAKFAST));
    assertEquals(2L, result.get(ItemCategory.DRINK));

    verify(itemRepository, times(5)).count(any(Specification.class));
  }
}
