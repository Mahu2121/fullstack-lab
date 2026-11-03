package org.dam.velumi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private double precio;
    private String descripcion;
    private int stock;
    private String imagenUrl;
    private String categoria;
    private Date fechaCreacion;
    private Boolean activo;
    private String imagenNombre;
}