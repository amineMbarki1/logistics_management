package com.logitics.server.controller;


import com.logitics.server.dto.TruckRequest;
import com.logitics.server.model.Truck;
import com.logitics.server.service.TruckService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trucks")

public class TruckController {
    private final TruckService truckService;

    public TruckController(TruckService truckService) {
        this.truckService = truckService;
    }

    @Operation(
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Created successfully")
            }
    )
    @PostMapping
    public ResponseEntity<Truck> createTruck(@RequestBody TruckRequest truckRequest) {
        var truck = truckService.createTruck(truckRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(truck);
    }

    @GetMapping
    public ResponseEntity<List<Truck>> getTrucks() {
        return ResponseEntity.ok(truckService.getTrucks());
    }


}

