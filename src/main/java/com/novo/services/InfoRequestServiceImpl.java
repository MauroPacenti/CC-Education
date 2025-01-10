package com.novo.services;

import com.novo.entities.InfoRequest;
import com.novo.repos.InfoRequestRepository;
import com.novo.repos.StatusRepository;

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
    public void addInfoRequest(InfoRequest infoRequest) {
        infoRequest.setStatus(statusRepo.findById(1).get());
        infoRequestRepo.save(infoRequest);
    }

    @Override
    public boolean deleteInfoRequest(int infoRequestId) {
        try {
            infoRequestRepo.deleteById(infoRequestId);
            return true;
        }
        catch(Exception e) {
            return false;
        }
    }

    @Override
    public void updateInfoRequest(int infoRequestId, int statusId) {
        InfoRequest edited = infoRequestRepo.findById(infoRequestId).get();
                edited.setStatus(statusRepo.findById(statusId).get());
                infoRequestRepo.save(edited);
    }
}
