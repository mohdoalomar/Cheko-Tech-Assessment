package com.example.sdaia.services;

import com.example.sdaia.entities.Item;
import com.example.sdaia.entities.dto.ItemDTO;
import com.example.sdaia.entities.dto.ItemPageResponseDTO;
import com.example.sdaia.repositories.ItemRepository;
import com.example.sdaia.util.ItemCategory;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ItemService {
  private final ItemRepository itemRepository;

  public ItemPageResponseDTO getAllItems(
      ItemCategory category,
      String sortBy,
      Boolean isAscending,
      Boolean bestSeller,
      String searchQuery,
      int pageSize,
      int pageNumber) {
    Specification<Item> specification =
        filterByCategoryAndBestSeller(category, bestSeller).and(searchFilter(searchQuery));
    Page<ItemDTO> items = getItemsPage(sortBy, isAscending, pageSize, pageNumber, specification);
    Map<ItemCategory, Long> counts = countItemsByCategory(specification);
    return ItemPageResponseDTO.builder().items(items).counts(counts).build();
  }

public Map<ItemCategory, ItemDTO> getSecondHighestCalorieItemPerCategory() {
    Map<ItemCategory, ItemDTO> result = new HashMap<>();
    for (ItemCategory category : ItemCategory.values())
      result.put(
          category, toDTO(itemRepository.findTheSecondHighestCaloryItemForACategory(category)));
    return result;
  }

  public Page<ItemDTO> getItemsPage(
      String sortBy,
      Boolean isAscending,
      int pageSize,
      int pageNumber,
      Specification<Item> specification) {
    Sort sort = isAscending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
    Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

    return itemRepository.findAll(specification, pageable).map(this::toDTO);
  }

  public Map<ItemCategory, Long> countItemsByCategory(Specification<Item> specification) {
    Map<ItemCategory, Long> counts = new LinkedHashMap<>();
    for (ItemCategory category : ItemCategory.values()) {
      Specification<Item> categorySpec =
          (root, query, cb) -> cb.equal(root.get("category"), category);
      Specification<Item> combinedSpec = specification.and(categorySpec);
      counts.put(category, itemRepository.count(combinedSpec));
    }
    return counts;
  }

  private static Specification<Item> filterByCategoryAndBestSeller(
      ItemCategory category, Boolean isBestSeller) {
    return (root, query, cb) ->
        cb.and(
            category != null ? cb.equal(root.get("category"), category) : cb.conjunction(),
            isBestSeller != null
                ? cb.equal(root.get("isBestSeller"), isBestSeller)
                : cb.conjunction());
  }

  private static Specification<Item> searchFilter(String search) {
    if (search == null || search.isBlank()) {
      return (root, query, cb) -> cb.conjunction(); // no filtering
    }

    String pattern = "%" + search.trim().toLowerCase() + "%";

    return (root, query, cb) ->
        cb.or(
            cb.like(cb.lower(root.get("name")), pattern),
            cb.like(cb.lower(root.get("description")), pattern));
  }

  private ItemDTO toDTO(Item item) {
    return ItemDTO.builder()
        .id(item.getId())
        .name(item.getName())
        .description(item.getDescription())
        .imageUrl(item.getImageUrl())
        .category(item.getCategory())
        .calories(item.getCalories())
        .isBestSeller(item.getIsBestSeller())
        .price(item.getPrice())
        .build();
  }
}
