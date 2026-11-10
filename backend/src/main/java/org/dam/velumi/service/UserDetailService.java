package org.dam.velumi.service;

import org.dam.velumi.model.Usuario;   // ajusta al paquete real de tu entidad
import org.dam.velumi.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {

    private final UserRepository repo;

    public UserDetailService(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario u = repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User no encontrado"));

        return User
                .withUsername(u.getUsername())
                .password(u.getPassword())
                .authorities(u.getRol())
                .build();
    }
}