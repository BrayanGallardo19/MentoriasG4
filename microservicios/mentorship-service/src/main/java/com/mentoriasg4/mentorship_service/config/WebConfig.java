package com.mentoriasg4.mentorship_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Aplica a todas las rutas bajo /api
                        .allowedOriginPatterns("*") // Permite CUALQUIER origen (localhost, 127.0.0.1, puerto 5174, etc.)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite todos los métodos
                        .allowedHeaders("*"); // Permite cualquier cabecera (como Content-Type)
            }
        };
    }
}