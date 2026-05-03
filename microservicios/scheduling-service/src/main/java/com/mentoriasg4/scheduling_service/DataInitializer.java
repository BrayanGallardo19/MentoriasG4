package com.mentoriasg4.scheduling_service;

import com.mentoriasg4.scheduling_service.model.MentorshipSession;
import com.mentoriasg4.scheduling_service.repository.MentorshipSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MentorshipSessionRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() == 0) {
            MentorshipSession session1 = new MentorshipSession();
            session1.setMentorId(2L);
            session1.setStudentId(4L);
            session1.setMentorName("Mentor Experto");
            session1.setStudentName("Estudiante Prueba");
            session1.setStudentImage("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150");
            session1.setTopic("Revisión de código React");
            session1.setDate("2026-05-14"); // En el futuro
            session1.setTime("10:00");
            session1.setDuration(30);
            session1.setPrice(15.0);
            session1.setStatus("pendiente");

            MentorshipSession session2 = new MentorshipSession();
            session2.setMentorId(2L);
            session2.setStudentId(4L);
            session2.setMentorName("Mentor Experto");
            session2.setStudentName("Estudiante Prueba");
            session2.setStudentImage("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150");
            session2.setTopic("Dudas sobre Spring Boot");
            session2.setDate("2026-05-01"); // En el pasado
            session2.setTime("15:00");
            session2.setDuration(45);
            session2.setPrice(20.0);
            session2.setStatus("completada");
            session2.setPlatformLink("https://zoom.us/j/123456789");

            repository.saveAll(List.of(session1, session2));
            System.out.println("Sesiones de prueba inicializadas.");
        }
    }
}