package org.dam.velumi.service;

import org.dam.velumi.model.Product;
import org.dam.velumi.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Product> findAll() {
        return productoRepository.findAll();
    }

    public Product findById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Product save(Product producto) {
        return productoRepository.save(producto);
    }

    public Product update(Long id, Product producto) {
        Product existente = findById(id);

        existente.setNombre(producto.getNombre());
        existente.setCategoria(producto.getCategoria());
        existente.setPrecio(producto.getPrecio());
        existente.setDescripcion(producto.getDescripcion());
        existente.setImagenNombre(producto.getImagenNombre());
        existente.setActivo(producto.getActivo());

        return productoRepository.save(existente);
    }

    public void delete(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        productoRepository.deleteById(id);
    }
}