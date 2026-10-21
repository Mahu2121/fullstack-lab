package org.dam.velumi.controller;

import org.dam.velumi.model.Product;
import org.dam.velumi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> listar() {
        return productService.findAll();
    }

    @PostMapping
    public Product crear(@RequestBody Product product) {
        return productService.save(product);
    }
}