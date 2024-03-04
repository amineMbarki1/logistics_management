package com.logitics.server.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TripRequest {
    private long driverId;
    private long truckId;
    private String task;
    private double weight;
    private double length;
    private double width;
    private double height;
    private LocationRequest startLocation;
    private LocationRequest destination;
    private LocalDateTime scheduledDepartureTime;
}
