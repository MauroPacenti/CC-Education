package com.novo.services;

import com.novo.entities.JourneyRequest;
import com.novo.repos.JourneyRequestRepository;
import com.novo.repos.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JourneyRequestServiceImpl implements JourneyRequestService {
    @Autowired
    private JourneyRequestRepository journeyRequestRepo;
    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<JourneyRequest> getJourneyRequests() {
        return journeyRequestRepo.findAll();
    }

    @Override
    public Optional<JourneyRequest> getJourneyRequest(int journeyRequestId) {
        return journeyRequestRepo.findById(journeyRequestId);
    }

    @Override
    public JourneyRequest addJourneyRequest(JourneyRequest journeyRequest) {
        journeyRequest.setStatus(statusRepository.findById(1).get());
        journeyRequestRepo.save(journeyRequest);
        List<JourneyRequest> newjourneyRequests = journeyRequestRepo.findAll();
        return newjourneyRequests.get(newjourneyRequests.size()-1);
    }

    @Override
    public boolean deleteJourneyRequest(int journeyRequestId) {
        try {
            journeyRequestRepo.deleteById(journeyRequestId);
        return true;
        } catch (Exception e) {
            return false;
        }

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
        journeyRequestRepo.save(edited);
    }
}
