package com.novo.services;

import com.novo.entities.JourneyRequest;
import com.novo.repos.JourneyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JourneyRequestServiceImpl implements JourneyRequestService {
    @Autowired
    private JourneyRequestRepository journeyRequestRepo;

    @Override
    public List<JourneyRequest> getJourneyRequests() {
        return journeyRequestRepo.findAll();
    }

    @Override
    public Optional<JourneyRequest> getJourneyRequest(int journeyRequestId) {
        return journeyRequestRepo.findById(journeyRequestId);
    }

    @Override
    public void addJourneyRequest(JourneyRequest journeyRequest) {
        journeyRequestRepo.save(journeyRequest);
    }

    @Override
    public void deleteJourneyRequest(int journeyRequestId) {
        journeyRequestRepo.deleteById(journeyRequestId);
    }

    @Override
    public void updateJourneyRequest(int journeyRequestId, JourneyRequest journeyRequest) {
        JourneyRequest edited=journeyRequestRepo.findById(journeyRequestId).get();
        if(journeyRequest.getStartAvailabilityDate() != null)
            edited.setStartAvailabilityDate(journeyRequest.getStartAvailabilityDate());
        if(journeyRequest.getEndAvailabilityDate() != null)
            edited.setEndAvailabilityDate(journeyRequest.getEndAvailabilityDate());
        if(journeyRequest.getDuration() != 0)
            edited.setDuration(journeyRequest.getDuration());
        journeyRequestRepo.save(journeyRequest);
    }
}
