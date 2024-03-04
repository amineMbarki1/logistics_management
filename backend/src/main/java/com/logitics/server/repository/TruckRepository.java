package com.logitics.server.repository;

import com.logitics.server.model.Truck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TruckRepository extends JpaRepository<Truck, Long> {
}
