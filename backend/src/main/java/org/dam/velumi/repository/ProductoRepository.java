package org.dam.velumi.repository;

import org.dam.velumi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Product, Long> {
}