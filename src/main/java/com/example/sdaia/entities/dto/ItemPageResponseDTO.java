package com.example.sdaia.entities.dto;

import com.example.sdaia.util.ItemCategory;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.Map;

@Data
@Builder
public class ItemPageResponseDTO {
    private Page<ItemDTO> items;
    private Map<ItemCategory, Long> counts;
}
