package com.mentoriasg4.user_service;

import com.mentoriasg4.user_service.model.Rol;
import com.mentoriasg4.user_service.model.Usuario;
import com.mentoriasg4.user_service.repository.RolRepository;
import com.mentoriasg4.user_service.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        
        if (rolRepository.count() == 0) {
            rolRepository.saveAll(List.of(
                new Rol(null, "ADMIN"),
                new Rol(null, "MENTOR"),
                new Rol(null, "ESTUDIANTE")
            ));
            System.out.println("Roles inicializados.");
        }

        if (usuarioRepository.count() == 0) {
            Rol rolAdmin = rolRepository.findById(1).orElseThrow();
            Rol rolMentor = rolRepository.findById(2).orElseThrow();
            Rol rolEstudiante = rolRepository.findById(3).orElseThrow();

            String defaultPassword = passwordEncoder.encode("123456");

            Usuario admin = new Usuario(null, "Administrador Principal", "admin@mentorias.com", defaultPassword, rolAdmin);
            Usuario mentor = new Usuario(null, "Mentor Experto", "mentor@mentorias.com", defaultPassword, rolMentor);
            Usuario estudiante = new Usuario(null, "Estudiante Aplicado", "estudiante@mentorias.com", defaultPassword, rolEstudiante);

            usuarioRepository.saveAll(List.of(admin, mentor, estudiante));
            System.out.println("Usuarios de prueba de MentoríasG4 inicializados.");
        }
    }
}
