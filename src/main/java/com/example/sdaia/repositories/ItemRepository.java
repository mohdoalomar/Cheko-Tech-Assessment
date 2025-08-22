package com.example.sdaia.repositories;

import com.example.sdaia.entities.Item;
import com.example.sdaia.util.ItemCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

  Page<Item> findAll(Specification<Item> specification, Pageable pageable);

  long count(Specification<Item> specification);

  @Query("SELECT i FROM Item i WHERE i.category = ?1  ORDER BY i.calories DESC LIMIT 1 OFFSET 1")
  Item findTheSecondHighestCaloryItemForACategory(ItemCategory category);
}
