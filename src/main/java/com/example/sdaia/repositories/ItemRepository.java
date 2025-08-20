package com.example.sdaia.repositories;

import com.example.sdaia.entities.Item;
import com.example.sdaia.util.ItemCategory;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAll(Specification<Item> specification, Sort sort);

//    List<Item> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
//
//    List<Item> findByCategory(ItemCategory category);

    long countByCategory(ItemCategory category);

    @Query("SELECT i FROM Item i WHERE i.category = ?1  ORDER BY i.calories DESC LIMIT 1 OFFSET 1")
    Item findTheSecondHighestCaloryItemForACategory(ItemCategory category);

}
