package com.novo.services;

import com.novo.entities.InfoRequest;

import java.util.List;
import java.util.Optional;

public interface InfoRequestService {
    List<InfoRequest> getInfoRequests();
    Optional<InfoRequest> getInfoRequest(int infoRequestId);
    void addInfoRequest(InfoRequest infoRequest);
    boolean deleteInfoRequest(int infoRequestId);
    void updateInfoRequest(int infoRequestId, int status);
}
