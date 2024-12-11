package com.novo.services;

import com.novo.entities.Keeper;

import java.util.List;

public interface KeeperService {
    List<Keeper> filteredKeepers(String text);
    void addKeeper(Keeper keeper);
    void updateKeeper(int KeeperId, Keeper keeper);
    void deleteKeeper(int keeperId);
}
