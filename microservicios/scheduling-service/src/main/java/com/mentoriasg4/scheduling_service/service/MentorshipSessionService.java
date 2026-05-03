package com.mentoriasg4.scheduling_service.service;

import com.mentoriasg4.scheduling_service.model.MentorshipSession;
import com.mentoriasg4.scheduling_service.repository.MentorshipSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MentorshipSessionService {

    @Autowired
    private MentorshipSessionRepository repository;

    public List<MentorshipSession> getAllSessions() {
        return repository.findAll();
    }

    public List<MentorshipSession> getSessionsByMentorId(Long mentorId) {
        return repository.findByMentorId(mentorId);
    }

    public List<MentorshipSession> getSessionsByStudentId(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public Optional<MentorshipSession> getSessionById(Long id) {
        return repository.findById(id);
    }

    public MentorshipSession createSession(MentorshipSession session) {
        return repository.save(session);
    }

    public MentorshipSession updateSession(Long id, MentorshipSession updatedSession) {
        return repository.findById(id).map(session -> {
            session.setStatus(updatedSession.getStatus());
            session.setPlatformLink(updatedSession.getPlatformLink());
            return repository.save(session);
        }).orElseThrow(() -> new RuntimeException("Session not found with id: " + id));
    }

    public void deleteSession(Long id) {
        repository.deleteById(id);
    }
}