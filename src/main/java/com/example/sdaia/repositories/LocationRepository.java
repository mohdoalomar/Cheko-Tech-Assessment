package com.example.sdaia.repositories;

import com.example.sdaia.entities.Location;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
  List<Location> findAll(Specification<Location> specification);
}
