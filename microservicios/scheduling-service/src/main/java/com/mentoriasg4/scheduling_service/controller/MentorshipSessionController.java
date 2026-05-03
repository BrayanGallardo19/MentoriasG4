package com.mentoriasg4.scheduling_service.controller;

import com.mentoriasg4.scheduling_service.model.MentorshipSession;
import com.mentoriasg4.scheduling_service.service.MentorshipSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorship-sessions")
public class MentorshipSessionController {

    @Autowired
    private MentorshipSessionService service;

    @GetMapping
    public List<MentorshipSession> getAll() {
        return service.getAllSessions();
    }

    @GetMapping("/mentor/{mentorId}")
    public List<MentorshipSession> getByMentor(@PathVariable Long mentorId) {
        return service.getSessionsByMentorId(mentorId);
    }

    @GetMapping("/student/{studentId}")
    public List<MentorshipSession> getByStudent(@PathVariable Long studentId) {
        return service.getSessionsByStudentId(studentId);
    }

    @PostMapping
    public MentorshipSession create(@RequestBody MentorshipSession session) {
        return service.createSession(session);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MentorshipSession> update(@PathVariable Long id, @RequestBody MentorshipSession session) {
        try {
            return ResponseEntity.ok(service.updateSession(id, session));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteSession(id);
        return ResponseEntity.noContent().build();
    }
}