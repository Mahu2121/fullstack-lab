package org.dam.velumi.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> buckets =
            new ConcurrentHashMap<>();

    private Bucket createBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.builder()
                        .capacity(5)
                        .refillGreedy(5, Duration.ofMinutes(1))
                        .build())
                .build();
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.equals("/api/auth/register")
                && request.getMethod().equals("POST")) {

            String ip = request.getRemoteAddr();

            Bucket bucket = buckets.computeIfAbsent(
                    ip, key -> createBucket()
            );

            if (!bucket.tryConsume(1)) {
                response.setStatus(429);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"error\":\"Too many requests\"}"
                );
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}