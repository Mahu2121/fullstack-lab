package org.dam.velumi.model;

import jakarta.persistence.*;
import lombok.Getter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Getter
@Entity
@Table(name = "users")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String rol;

    @Email(message = "El formato del correo electrónico no es válido")
    @NotBlank(message = "El correo electrónico es obligatorio")
    @Column(nullable = false, unique = true)
    private String email;

    public void setId(Long id) { this.id = id; }

    public void setUsername(String username) { this.username = username; }

    public void setPassword(String password) { this.password = password; }

    public void setRol(String rol) { this.rol = rol; }

    public void setEmail(String email) { this.email = email; }
}