package org.dam.velumi.service;

import org.dam.velumi.model.Product;
import org.dam.velumi.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Product> findAll() {
        return productoRepository.findAll();
    }

    public Product save(Product producto) {
        return productoRepository.save(producto);
    }
}
