package com.logitics.server.dto;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class DriverRequest {

    private String phoneNumber;
    private String name;
    private String licenceNumber;
    private String photo;

}
