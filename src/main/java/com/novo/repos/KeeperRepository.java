package com.novo.repos;

import com.novo.entities.Keeper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeeperRepository extends JpaRepository<Keeper, Integer> {
}
