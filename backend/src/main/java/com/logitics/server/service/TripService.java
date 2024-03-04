package com.logitics.server.service;


import com.logitics.server.dto.TripRequest;
import com.logitics.server.mappers.TripMapper;
import com.logitics.server.model.Trip;
import com.logitics.server.repository.LocationRepository;
import com.logitics.server.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {
    private final TruckService truckService;
    private final DriverService driverService;
    private final TripRepository tripRepository;
    private final LocationRepository locationRepository;

    public TripService(TruckService truckService, DriverService driverService, TripRepository tripRepository, LocationRepository locationRepository) {
        this.truckService = truckService;
        this.driverService = driverService;
        this.tripRepository = tripRepository;
        this.locationRepository = locationRepository;
    }

    public List<Trip> getTrips() {
        return tripRepository.findAll();
    }

    public Trip createTrip(TripRequest tripRequest) {
        var truck = truckService.getTruck(tripRequest.getTruckId());
        var driver = driverService.getDriver(tripRequest.getDriverId());
        var trip = TripMapper.INSTANCE.toTrip(tripRequest);
        var startLocation = TripMapper.INSTANCE.toLocation(tripRequest.getStartLocation());
        var destination = TripMapper.INSTANCE.toLocation(tripRequest.getDestination());
        locationRepository.saveAll(List.of(startLocation, destination));
        trip.setStartLocation(startLocation);
        trip.setDestination(destination);
        trip.setTruck(truck);
        trip.setDriver(driver);
        return tripRepository.save(trip);
    }

}
