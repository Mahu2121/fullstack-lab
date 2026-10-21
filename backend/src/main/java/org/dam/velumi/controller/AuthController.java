package org.dam.velumi.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtEncoder encoder;

    public AuthController(AuthenticationManager authManager, JwtEncoder encoder) {
        this.authManager = authManager;
        this.encoder = encoder;
    }

    public record LoginRequest(String username, String password) {}

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.username(), req.password()));

        Instant now = Instant.now();
        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(auth.getName())
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .claim("roles", roles)
                .build();

        String token = encoder.encode(
                JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims)
        ).getTokenValue();

        return Map.of("token", token);
    }
}