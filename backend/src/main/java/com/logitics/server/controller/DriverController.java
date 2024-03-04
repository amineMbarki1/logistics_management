package com.logitics.server.controller;


import com.logitics.server.dto.DriverRequest;
import com.logitics.server.dto.DriverResponse;
import com.logitics.server.mappers.DriverMapper;
import com.logitics.server.service.DriverService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")

@Tag(name = "Driver")
public class DriverController {
    private final DriverService driverService;
    private final DriverMapper driverMapper;

    public DriverController(DriverService driverService, DriverMapper driverMapper) {
        this.driverService = driverService;
        this.driverMapper = driverMapper;
    }

    @Operation(
            description = "Create a new driver",
            summary = "This is a summary for creating a new driver endpoint",
            responses = {
                    @ApiResponse(
                            description = "success",
                            responseCode = "201"
                    )
            }
    )
    @PostMapping
    public ResponseEntity<DriverResponse> createDriver(@RequestBody DriverRequest driver) {
        var newDriver = driverService.createDriver(driverMapper.toDriver(driver));
        return ResponseEntity.status(HttpStatus.CREATED).body(driverMapper.toDriverResponse(newDriver));
    }

    @Operation(
            description = "Get all drivers"
    )
    @GetMapping
    ResponseEntity<List<DriverResponse>> getDrivers() {
        return ResponseEntity.ok(driverService.
                getDrivers()
                .stream()
                .map(driverMapper::toDriverResponse)
                .toList());
    }
}




