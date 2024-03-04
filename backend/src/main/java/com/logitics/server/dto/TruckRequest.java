package com.logitics.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TruckRequest {
    private String photo;
    private String number;
    private String brand;
    private String modelNumber;
    private double maxLoadCapacity;
}
