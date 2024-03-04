package com.logitics.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TripResponse {
    private long id;

    private DriverResponse driver;
    private TruckResponse truck;

    private LocationResponse startLocation;
    private LocationResponse destination;

    private double weight;
    private double height;
    private double width;
    private double length;

    private String task;

    private LocalDateTime departureTime;
    private LocalDateTime scheduledDepartureTime;
    private LocalDateTime arrivalTime;
}
