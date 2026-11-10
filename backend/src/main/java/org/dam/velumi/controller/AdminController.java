package org.dam.velumi.controller;

import org.dam.velumi.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/usuarios")
public class AdminController {

    public record UsuarioDTO(Long id, String username, String rol) {}

    private final UserRepository repo;

    public AdminController(UserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<UsuarioDTO> listar() {
        return repo.findAll().stream()
                .map(u -> new UsuarioDTO(
                        u.getId(),
                        u.getUsername(),
                        u.getRol()
                ))
                .toList();
    }
}