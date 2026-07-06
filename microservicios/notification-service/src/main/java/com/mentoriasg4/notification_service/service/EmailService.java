package com.mentoriasg4.notification_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Value("${mailjet.api.key}")
    private String apiKey;

    @Value("${mailjet.secret.key}")
    private String secretKey;

    @Value("${mailjet.sender.email:certimentor@gmail.com}")
    private String senderEmail;

    private final RestTemplate restTemplate = new RestTemplate();

    private void sendEmail(String toEmail, String toName, String subject, String textContent) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String auth = Base64.getEncoder().encodeToString((apiKey + ":" + secretKey).getBytes());
            headers.set("Authorization", "Basic " + auth);

            Map<String, Object> message = Map.of(
                "From", Map.of("Email", senderEmail, "Name", "CertiMentor"),
                "To", List.of(Map.of("Email", toEmail, "Name", toName != null ? toName : toEmail)),
                "Subject", subject,
                "TextPart", textContent
            );

            Map<String, Object> body = Map.of("Messages", List.of(message));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            restTemplate.postForEntity("https://api.mailjet.com/v3.1/send", entity, String.class);
            logger.info("Correo enviado exitosamente a {}", toEmail);
        } catch (Exception ex) {
            logger.warn("No se pudo enviar correo a {}: {}", toEmail, ex.getMessage());
        }
    }

    public void sendWelcomeEmail(String toEmail, String toName) {
        sendEmail(toEmail, toName,
            "Bienvenido/a a CertiMentor",
            "Hola " + toName + ",\n\n" +
            "Bienvenido/a a CertiMentor. Nos alegra tenerte en la plataforma.\n" +
            "Si tienes preguntas, puedes responder a este correo.\n\n" +
            "Saludos,\nEquipo CertiMentor"
        );
    }

    public void sendBookingStudentEmail(String toEmail, String toName, String mentorName, String date, String time) {
        sendEmail(toEmail, toName,
            "Sesion Agendada Exitosamente - CertiMentor",
            "Hola " + toName + ",\n\n" +
            "Tu sesion de mentoria con " + mentorName + " ha sido agendada.\n" +
            "El mentor revisara la solicitud y te confirmara pronto.\n\n" +
            "Fecha: " + date + "\n" +
            "Hora: " + time + "\n\n" +
            "Puedes revisar el estado de tu sesion en tu panel de estudiante.\n\n" +
            "Saludos,\nEquipo CertiMentor"
        );
    }

    public void sendBookingMentorEmail(String toEmail, String mentorName, String studentName, String date, String time) {
        sendEmail(toEmail, mentorName,
            "Nueva Reserva de Mentoria - CertiMentor",
            "Hola " + mentorName + ",\n\n" +
            "Tienes una nueva solicitud de mentoria!\n" +
            "El estudiante " + studentName + " ha agendado una sesion contigo.\n\n" +
            "Fecha: " + date + "\n" +
            "Hora: " + time + "\n\n" +
            "Por favor, ingresa a tu Dashboard para aprobar la sesion.\n\n" +
            "Saludos,\nEquipo CertiMentor"
        );
    }

    public void sendCancellationEmail(String toEmail, String toName, String sessionDate, String reason) {
        sendEmail(toEmail, toName,
            "Sesion Cancelada - CertiMentor",
            "Hola " + toName + ",\n\n" +
            "Te informamos que la sesion programada para el " + sessionDate + " ha sido cancelada.\n\n" +
            (reason != null && !reason.isBlank() ? "Razon indicada: " + reason + "\n\n" : "") +
            "Si necesitas reagendar, coordina una nueva sesion desde la plataforma.\n\n" +
            "Saludos,\nEquipo CertiMentor"
        );
    }
}