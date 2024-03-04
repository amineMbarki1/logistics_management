package com.logitics.server.mappers;


import com.logitics.server.dto.TruckRequest;
import com.logitics.server.model.Truck;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;


public class TruckMapperTest {
    @Test
    public void toTruck_should_returnCorrectTruck() {
        TruckRequest truckRequest = new TruckRequest();
        truckRequest.setBrand("Brand");
        truckRequest.setPhoto("Truck Photo");
        truckRequest.setMaxLoadCapacity(12);
        truckRequest.setNumber("dfsfsdf");

        Truck truck = TruckMapper.INSTANCE.toTruck(truckRequest);

        Assertions.assertAll(
                () -> Assertions.assertEquals(truck.getBrand(), truckRequest.getBrand()),
                () -> Assertions.assertEquals(truck.getPhoto(), truckRequest.getPhoto()),
                () -> Assertions.assertEquals(truck.getModelNumber(), truckRequest.getModelNumber()),
                () -> Assertions.assertEquals(truck.getModelNumber(), truckRequest.getModelNumber())
        );
    }

    @Test
    public void toTruckResponse_shouldReturnCorrectTruckResponse() {
        var truckRequest = new Truck();
        truckRequest.setBrand("Brand");
        truckRequest.setPhoto("Truck Photo");
        truckRequest.setMaxLoadCapacity(12);
        truckRequest.setNumber("dfsfsdf");
        truckRequest.setModelNumber("1212");
        truckRequest.setId(1);

        var truck = TruckMapper.INSTANCE.toTruckResponse(truckRequest);

        Assertions.assertAll(
                () -> Assertions.assertEquals(truck.getBrand(), truckRequest.getBrand()),
                () -> Assertions.assertEquals(truck.getPhoto(), truckRequest.getPhoto()),
                () -> Assertions.assertEquals(truck.getModelNumber(), truckRequest.getModelNumber()),
                () -> Assertions.assertEquals(truck.getModelNumber(), truckRequest.getModelNumber()),
                () -> Assertions.assertEquals(truck.getId(), truckRequest.getId())
        );
    }


}
