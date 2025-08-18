package com.example.sdaia.controllers;

import com.example.sdaia.entities.Item;
import com.example.sdaia.entities.dto.ItemDTO;
import com.example.sdaia.services.ItemService;
import com.example.sdaia.util.ItemCategory;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
public class ItemController {
    private final ItemService itemService;

    @GetMapping("/items")
    public List<ItemDTO> getItems(    @RequestParam(name = "search", required = false) String search,
                                      @RequestParam(name = "category", required = false) ItemCategory category,
                                      @RequestParam(name = "bestSeller", required = false) Boolean bestSeller,
                                      @RequestParam(name = "sortBy", required = false, defaultValue = "price") String sortBy,
                                      @RequestParam(name = "ascending", required = false, defaultValue = "true") boolean ascending
    ){
        return itemService.getAllItems(category, sortBy, ascending, bestSeller, search);
    }



}
