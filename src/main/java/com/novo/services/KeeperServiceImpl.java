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
                	// Ensure text is provided
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

    // Returns the id if present otherwise returns false
    @Override
    public Optional<Keeper> getKeeper(int id) {
        return keeperRepo.findById(id);
    }
    
    // Adds a keeper by requested parameters
    @Override
    public Keeper addKeeper(Keeper keeper) {
        try {
            keeperRepo.save(keeper);
            List<Keeper> allKeepers = keeperRepo.findAll();
            Keeper newKeeper = allKeepers.get(allKeepers.size()-1);
            return newKeeper;
        } catch (Exception e) {
            return null;
        }
    }

	// Updates an existing keeper by requested parameters
    @Override
    public Keeper updateKeeper(int keeperId, Keeper keeper) {
        Keeper edited=keeperRepo.findById(keeperId).get();
        
        // Ensure firstName is provided
        if(!keeper.getFirstName().isEmpty())
            edited.setFirstName(keeper.getFirstName());
        
        // Ensure lastName is provided
        if(!keeper.getLastName().isEmpty())
            edited.setLastName(keeper.getLastName());
        
        // Ensure email is provided
        if(!keeper.getEmail().isEmpty())
            edited.setEmail(keeper.getEmail());
        
        // Ensure cf is provided
        if(!keeper.getCf().isEmpty())
            edited.setCf(keeper.getCf());
        
         // Ensure phone is provided
        if(!keeper.getPhone().isEmpty())
            edited.setPhone(keeper.getPhone());
        
        return keeperRepo.save(edited);
    }

	// Deletes an existing Keeper, if it doesn't find the keeper, return false
    @Override
    public boolean deleteKeeper(Keeper keeper) {
        try{
            keeperRepo.delete(keeper);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
