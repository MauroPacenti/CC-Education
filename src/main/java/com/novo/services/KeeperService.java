package com.novo.services;

import com.novo.entities.Keeper;

import java.util.List;
import java.util.Optional;

public interface KeeperService {
    List<Keeper> filteredKeepers(String text);
    Optional<Keeper> getKeeper(int id);
    Keeper addKeeper(Keeper keeper);
    void updateKeeper(int KeeperId, Keeper keeper);
    void deleteKeeper(Keeper keeper);
}
