package com.logitics.server.controller;


import com.logitics.server.dto.TripRequest;
import com.logitics.server.dto.TripResponse;
import com.logitics.server.mappers.TripMapper;
import com.logitics.server.model.Trip;
import com.logitics.server.service.TripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;


    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public List<TripResponse> getTrips() {
        return tripService.getTrips().stream().map(TripMapper.INSTANCE::toTripResponse).toList();
    }

    @PostMapping
    public TripResponse createTrip(@RequestBody TripRequest tripRequest) {
        return TripMapper.INSTANCE.toTripResponse(tripService.createTrip(tripRequest));
    }

}


