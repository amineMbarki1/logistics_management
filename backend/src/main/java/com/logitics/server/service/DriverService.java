package com.logitics.server.service;


import com.logitics.server.model.Driver;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.logitics.server.repository.DriverRepository;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DriverService {
    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public List<Driver> getDrivers() {
        return driverRepository.findAll();
    }


    public Driver getDriver(Long id) {
        return driverRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Driver not found"));
    }

}
