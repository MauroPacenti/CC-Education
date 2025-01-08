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

    // Returns a list of keeper depending on search text
    @Override
    public List<Keeper> filteredKeepers(String text) {
        List<Keeper> allKeepers = keeperRepo.findAll();
        List<Keeper> filteredKeepers = new ArrayList<Keeper>(allKeepers.stream()
                .filter(keeper -> {
                    if(text != null && !text.isEmpty()) {
                        return keeper.search(text);
                    }
                    else {
                        return true;
                    }
                })
                .toList());
        return filteredKeepers;
    }

    @Override
    public Optional<Keeper> getKeeper(int id) {
        return keeperRepo.findById(id);
    }

    @Override
    public void addKeeper(Keeper keeper) {
        keeperRepo.save(keeper);
    }

    @Override
    public void updateKeeper(int keeperId, Keeper keeper) {
        Keeper edited=keeperRepo.findById(keeperId).get();
        if(!keeper.getFirstName().isEmpty())
            edited.setFirstName(keeper.getFirstName());
        if(!keeper.getLastName().isEmpty())
            edited.setLastName(keeper.getLastName());
        if(!keeper.getEmail().isEmpty())
            edited.setEmail(keeper.getEmail());
        if(!keeper.getCf().isEmpty())
            edited.setCf(keeper.getCf());
        if(!keeper.getPhone().isEmpty())
            edited.setPhone(keeper.getPhone());
        keeperRepo.save(edited);
    }

    @Override
    public void deleteKeeper(int keeperId) {
        keeperRepo.delete(keeperRepo.findById(keeperId).get());
    }
}
