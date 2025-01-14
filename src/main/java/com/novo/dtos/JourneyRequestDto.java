package com.novo.dtos;

import com.novo.entities.Group;
import com.novo.entities.JourneyRequest;
import com.novo.entities.Keeper;
import com.novo.entities.Organization;

public class JourneyRequestDto {
    private Keeper keeper;
    private Group group;
    private Organization organization;
    private JourneyRequest journeyRequest;

    public Keeper getKeeper() {
        return keeper;
    }

    public void setKeeper(Keeper keeper) {
        this.keeper = keeper;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public JourneyRequest getJourneyRequest() {
        return journeyRequest;
    }

    public void setJourneyRequest(JourneyRequest journeyRequest) {
        this.journeyRequest = journeyRequest;
    }
}
