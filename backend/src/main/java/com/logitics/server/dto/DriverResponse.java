package com.logitics.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DriverResponse {
    private long id;
    private String phoneNumber;
    private String name;
    private String licenceNumber;
    private String photo;
}
