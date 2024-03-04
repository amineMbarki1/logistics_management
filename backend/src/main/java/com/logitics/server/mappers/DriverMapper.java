package com.logitics.server.mappers;


import com.logitics.server.dto.DriverRequest;
import com.logitics.server.dto.DriverResponse;
import com.logitics.server.model.Driver;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class DriverMapper {
    public DriverResponse toDriverResponse(Driver driver) {
        DriverResponse driverResponse = new DriverResponse();
        BeanUtils.copyProperties(driver, driverResponse);
        return driverResponse;
    }

    public Driver toDriver(DriverRequest driverRequest) {
        Driver driver = new Driver();
        BeanUtils.copyProperties(driverRequest, driver);
        return driver;
    }


}
