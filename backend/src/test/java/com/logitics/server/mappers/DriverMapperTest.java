package com.logitics.server.mappers;


import com.logitics.server.model.Driver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class DriverMapperTest {

    private DriverMapper driverMapper = new DriverMapper();

    @Test
    public void DriverMapper_ToDriverResponse_ReturnsDriverResponse() {
        //Arrange
        Driver driver = new Driver();
        driver.setId(1l);
        driver.setName("amine");
        driver.setPhoto("photoUrl");
        driver.setPhoneNumber("num");
        driver.setLicenceNumber("qsd,qsld");
        //Act
        var response = driverMapper.toDriverResponse(driver);
        //Assert
        Assertions.assertAll(
                () -> Assertions.assertEquals(response.getName(), driver.getName()),
                () -> Assertions.assertEquals(response.getId(), driver.getId()),
                () -> Assertions.assertEquals(response.getLicenceNumber(), driver.getLicenceNumber())
        );
    }




}
