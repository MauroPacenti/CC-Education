package com.novo.controllers;

import com.novo.entities.*;
import com.novo.services.GroupService;
import com.novo.services.JourneyRequestService;
import com.novo.services.KeeperService;
import com.novo.services.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class KeeperController {
    @Autowired
    private KeeperService keeperService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private JourneyRequestService journeyRequestService;


    @GetMapping("/pub/getKeepers")
    public ResponseEntity<List<Keeper>> getKeepers(@RequestParam(required = false) String key) {
        List<Keeper> keepers = keeperService.filteredKeepers(key);
        if (keepers.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.ok(keepers);
        }
    }

    @PostMapping("/pub/addKeeper")
    public ResponseEntity<Keeper> addKeeper(@RequestParam String firstName,
                                            @RequestParam String lastName,
                                            @RequestParam String email,
                                            @RequestParam String cf,
                                            @RequestParam String phone) {
        Keeper keeper = new Keeper();
        keeper.setFirstName(firstName);
        keeper.setLastName(lastName);
        keeper.setEmail(email);
        keeper.setCf(cf);
        keeper.setPhone(phone);
        try {
            keeperService.addKeeper(keeper);
            return ResponseEntity.ok(keeper);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/auth/editKeeper")
    public ResponseEntity<Keeper> editKeeper(@RequestParam int keeperId,
                                             @RequestParam(required = false) String firstName,
                                             @RequestParam(required = false) String lastName,
                                             @RequestParam(required = false) String email,
                                             @RequestParam(required = false) String cf,
                                             @RequestParam(required = false) String phone) {
        Keeper keeper = new Keeper();
        keeper.setFirstName(firstName);
        keeper.setLastName(lastName);
        keeper.setEmail(email);
        keeper.setCf(cf);
        keeper.setPhone(phone);
        try{
            keeperService.updateKeeper(keeperId, keeper);
            return ResponseEntity.ok(keeperService.getKeeper(keeperId).get());
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/auth/deleteKeeper")
    public ResponseEntity<String> deleteKeeper(@RequestParam int keeperId) {
        try{
            keeperService.deleteKeeper(keeperId);
            return ResponseEntity.ok("Cancellazione avvenuta con successo");
        } catch (Exception e){
            return ResponseEntity.noContent().build();
        }
    }
}
