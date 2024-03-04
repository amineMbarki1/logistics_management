package com.logitics.server.mappers;


import com.logitics.server.model.Trip;
import com.logitics.server.repository.TripRepository;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@DataJpaTest
public class TripMapperTest {

    @Autowired
    public TripRepository tripRepository;

    @Test
    public void toTripResponse_ShouldReturnCorrectTripResponse() {
        //Arrange

        Trip first = tripRepository.findAll().stream().findFirst().get();
        //Act
       var tripResponse =  TripMapper.INSTANCE.toTripResponse(first);
        //Assert
        Assertions.assertEquals(tripResponse.getId(), first.getId());

    }


}
