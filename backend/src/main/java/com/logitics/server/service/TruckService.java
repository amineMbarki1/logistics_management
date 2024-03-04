package com.logitics.server.service;

import com.logitics.server.dto.TruckRequest;
import com.logitics.server.mappers.TruckMapper;
import com.logitics.server.model.Truck;
import com.logitics.server.repository.TruckRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
public class TruckService {


    private final TruckRepository truckRepository;

    public TruckService(TruckRepository truckRepository) {
        this.truckRepository = truckRepository;
    }

    public Truck createTruck(TruckRequest truckRequest) {
        return truckRepository.save(TruckMapper.INSTANCE.toTruck(truckRequest));
    }

    public List<Truck> getTrucks() {
        return truckRepository.findAll();
    }

    public Truck getTruck(Long id) {
        return truckRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Truck not found"));
    }


}
