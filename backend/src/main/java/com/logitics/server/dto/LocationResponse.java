package com.logitics.server.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationResponse {
    private String displayName;
    private double latitude;
    private double longitude;
}
