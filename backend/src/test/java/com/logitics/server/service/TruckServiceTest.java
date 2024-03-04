package com.logitics.server.service;

import com.logitics.server.dto.TruckRequest;
import com.logitics.server.model.Truck;
import com.logitics.server.repository.TruckRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class TruckServiceTest {

    @Mock
    private TruckRepository truckRepository;

    @InjectMocks
    private TruckService truckService;

    @Test
    public void createTruck_shouldCreateTruck() {
        //Arrange
        var truck = new TruckRequest();
        truck.setNumber("124");
        truck.setBrand("breand");
        //Act
        truckService.createTruck(truck);
        //Assert
        Mockito.verify(truckRepository).save(Mockito.any(Truck.class));

    }
}
