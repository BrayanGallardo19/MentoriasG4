package com.mentoriasg4.mentorship_service.service;

import com.mentoriasg4.mentorship_service.model.MentorshipOffer;
import com.mentoriasg4.mentorship_service.repository.MentorshipOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MentorshipOfferService {

    @Autowired
    private MentorshipOfferRepository repository;

    public List<MentorshipOffer> getAllOffers() {
        return repository.findAll();
    }

    public List<MentorshipOffer> getOffersByMentorId(Long mentorId) {
        return repository.findByMentorId(mentorId);
    }

    public Optional<MentorshipOffer> getOfferById(Long id) {
        return repository.findById(id);
    }

    public MentorshipOffer createOffer(MentorshipOffer offer) {
        return repository.save(offer);
    }

    public MentorshipOffer updateOffer(Long id, MentorshipOffer updatedOffer) {
        return repository.findById(id).map(offer -> {
            offer.setTitle(updatedOffer.getTitle());
            offer.setImage(updatedOffer.getImage());
            offer.setPrice(updatedOffer.getPrice());
            offer.setSkills(updatedOffer.getSkills());
            offer.setTimeStart(updatedOffer.getTimeStart());
            offer.setTimeEnd(updatedOffer.getTimeEnd());
            offer.setAvailableDates(updatedOffer.getAvailableDates());
            return repository.save(offer);
        }).orElseThrow(() -> new RuntimeException("Offer not found with id: " + id));
    }

    public void deleteOffer(Long id) {
        repository.deleteById(id);
    }
}