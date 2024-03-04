package com.logitics.server.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Getter
@Setter
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Driver driver;
    @ManyToOne
    private Truck truck;

    @ManyToOne
    private Location startLocation;
    @ManyToOne
    private Location destination;

    private double weight;
    private double height;
    private double width;
    private double length;

    private String task;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private LocalDateTime scheduledDepartureTime;

    @Enumerated(EnumType.STRING)
    private TripStatus status = TripStatus.IDLE;

}

enum TripStatus {
    IDLE, IN_TRANSIT, STOPPED, COMPLETED;
}