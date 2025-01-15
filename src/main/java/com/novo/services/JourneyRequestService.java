package com.novo.services;

import com.novo.entities.JourneyRequest;

import java.util.List;
import java.util.Optional;

public interface JourneyRequestService {
    List<JourneyRequest> getJourneyRequests();
    Optional<JourneyRequest> getJourneyRequest(int journeyRequestId);
    JourneyRequest addJourneyRequest(JourneyRequest journeyRequest);
    boolean deleteJourneyRequest(int journeyRequestId);
    void updateJourneyRequest(int journeyRequestId, JourneyRequest journeyRequest);
}
