package com.example.sdaia.services;

import com.example.sdaia.entities.Item;
import com.example.sdaia.entities.dto.ItemDTO;
import com.example.sdaia.repositories.ItemRepository;
import com.example.sdaia.util.ItemCategory;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    public List<ItemDTO> getAllItems(ItemCategory category,String sortBy, boolean isAscending, boolean bestSeller, String searchQuery) {
        Sort sort = isAscending? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return itemRepository.findAll(
                        filterByCategoryAndBestSeller(category, bestSeller),
                        searchFilter(searchQuery),
                        sort).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

//    public List<ItemDTO> searchItems(String query) {
//        return itemRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query)
//                .stream()
//                .map(this::toDTO)
//                .collect(Collectors.toList());
//    }
//
//    public List<ItemDTO> filterItemsByCategory(ItemCategory category) {
//        return itemRepository.findByCategory(category)
//                .stream()
//                .map(this::toDTO)
//                .collect(Collectors.toList());
//    }

    public Map<ItemCategory, Long> countItemsByCategory() {
        Map<ItemCategory, Long> counts = new HashMap<>();
        for (ItemCategory category : ItemCategory.values()) {
            counts.put(category, itemRepository.countByCategory(category));
        }
        return counts;
    }

    public Map<ItemCategory, ItemDTO> getSecondHighestCalorieItemPerCategory() {
        Map<ItemCategory, ItemDTO> result = new HashMap<>();
        for (ItemCategory category : ItemCategory.values())
            result.put(category, toDTO(itemRepository.findTheSecondHighestCaloryItemForACategory(category)));
        return result;
    }

    private static Specification<Item> filterByCategoryAndBestSeller(ItemCategory category, Boolean isBestSeller) {
        return (root, query, cb) -> cb.and(
                category != null ? cb.equal(root.get("category"), category) : cb.conjunction(),
                isBestSeller != null ? cb.equal(root.get("isBestSeller"), isBestSeller) : cb.conjunction()
        );
    }
    private static Specification<Item> searchFilter (String search) {
        if (search == null || search.isBlank()) {
            return (root, query, cb) -> cb.conjunction(); // no filtering
        }

        String pattern = "%" + search.trim().toLowerCase() + "%";

        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), pattern),
                cb.like(cb.lower(root.get("description")), pattern)
        );
    }
    private ItemDTO toDTO(Item item) {
        ItemDTO dto = new ItemDTO();
        dto.setName(item.getName());
        dto.setDescription(item.getDescription());
        dto.setImageUrl(item.getImageUrl());
        dto.setCategory(item.getCategory());
        dto.setCalories(item.getCalories());
        dto.setBestSeller(item.isBestSeller());
        dto.setPrice(item.getPrice());
        return dto;
    }
}
