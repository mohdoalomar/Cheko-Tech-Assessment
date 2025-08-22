package com.example.sdaia.entities.dto;

import com.example.sdaia.util.ItemCategory;
import java.util.Map;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@Builder
public class ItemPageResponseDTO {
  private Page<ItemDTO> items;
  private Map<ItemCategory, Long> counts;
}
