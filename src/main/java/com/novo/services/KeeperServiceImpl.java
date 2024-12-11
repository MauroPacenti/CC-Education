package com.novo.services;

import com.novo.entities.Keeper;
import com.novo.repos.KeeperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class KeeperServiceImpl implements KeeperService {
    @Autowired
    private KeeperRepository keeperRepo;

    //returns a list of keeper depending on search text
    @Override
    public List<Keeper> filteredKeepers(String text) {
        List<Keeper> allKeepers = keeperRepo.findAll();
        return new ArrayList<>(allKeepers.stream()
                .filter(keeper -> keeper.search(text))
                .toList());
    }

    @Override
    public void addKeeper(Keeper keeper) {
        keeperRepo.save(keeper);
    }

    @Override
    public void updateKeeper(int keeperId, Keeper keeper) {
        Keeper edited=keeperRepo.findById(keeperId).get();
        edited.setFirstName(keeper.getFirstName());
        edited.setLastName(keeper.getLastName());
        edited.setEmail(keeper.getEmail());
        edited.setCf(keeper.getCf());
        edited.setPhone(keeper.getPhone());
        keeperRepo.save(edited);
    }

    @Override
    public void deleteKeeper(int keeperId) {
        keeperRepo.delete(keeperRepo.findById(keeperId).get());
    }
}
