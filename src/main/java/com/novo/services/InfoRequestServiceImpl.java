package com.novo.services;

import com.novo.entities.InfoRequest;
import com.novo.repos.InfoRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InfoRequestServiceImpl implements InfoRequestService {
    @Autowired
    private InfoRequestRepository infoRequestRepo;
    @Autowired
    private StatusRepository statusRepo;

    @Override
    public List<InfoRequest> getInfoRequests() {
        return infoRequestRepo.findAll();
    }

    @Override
    public Optional<InfoRequest> getInfoRequest(int infoRequestId) {
        return infoRequestRepo.findById(infoRequestId);
    }

    @Override
    public void addJourneyRequest(InfoRequest infoRequest) {
        infoRequestRepo.save(infoRequest);
    }

    @Override
    public void deleteInfoRequest(int infoRequestId) {
        infoRequestRepo.deleteById(infoRequestId);
    }

    @Override
    public void updateInfoRequest(int infoRequestId, int statusId) {

        InfoRequest edited = infoRequestRepo.findById(infoRequestId).get();
                edited.setStatus(statusRepo.getStatus(statusId));
                infoRequestRepo.save(edited);
    }
}
