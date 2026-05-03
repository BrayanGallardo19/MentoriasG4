package com.mentoriasg4.mentorship_service.repository;

import com.mentoriasg4.mentorship_service.model.MentorshipOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorshipOfferRepository extends JpaRepository<MentorshipOffer, Long> {
    List<MentorshipOffer> findByMentorId(Long mentorId);
}