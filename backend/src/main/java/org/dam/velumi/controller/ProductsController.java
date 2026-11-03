package org.dam.velumi.controller;

import org.dam.velumi.model.Product;
import org.dam.velumi.repository.ProductoRepository;
import org.dam.velumi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.TimeUnit;
@RestController
@RequestMapping("/api/productos")
public class ProductsController {

    private final Path carpeta = Paths.get("uploads/productos").toAbsolutePath().normalize();

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Product> listar() {
        return productService.findAll();
    }

    @PostMapping
    public Product crear(@RequestBody Product product) {
        return productService.save(product);
    }

    @GetMapping("/{id}/imagen")
    public ResponseEntity<Resource> getImagen(@PathVariable Long id) throws IOException {
        Product producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (producto.getImagenNombre() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Path archivo = carpeta.resolve(producto.getImagenNombre()).normalize();

        if (!archivo.startsWith(carpeta) || !Files.exists(archivo)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        String contentType = Files.probeContentType(archivo);
        if (contentType == null) contentType = "application/octet-stream";

        Resource recurso = new UrlResource(archivo.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .cacheControl(CacheControl.maxAge(1, TimeUnit.DAYS))
                .body(recurso);
    }
}