package com.logitics.server.mappers;

import com.logitics.server.dto.TruckRequest;
import com.logitics.server.dto.TruckResponse;
import com.logitics.server.model.Truck;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-04T12:00:15+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
public class TruckMapperImpl implements TruckMapper {

    @Override
    public Truck toTruck(TruckRequest truckRequest) {
        if ( truckRequest == null ) {
            return null;
        }

        Truck truck = new Truck();

        truck.setPhoto( truckRequest.getPhoto() );
        truck.setNumber( truckRequest.getNumber() );
        truck.setBrand( truckRequest.getBrand() );
        truck.setModelNumber( truckRequest.getModelNumber() );
        truck.setMaxLoadCapacity( truckRequest.getMaxLoadCapacity() );

        return truck;
    }

    @Override
    public TruckResponse toTruckResponse(Truck truck) {
        if ( truck == null ) {
            return null;
        }

        TruckResponse truckResponse = new TruckResponse();

        truckResponse.setId( truck.getId() );
        truckResponse.setPhoto( truck.getPhoto() );
        truckResponse.setNumber( truck.getNumber() );
        truckResponse.setBrand( truck.getBrand() );
        truckResponse.setModelNumber( truck.getModelNumber() );
        truckResponse.setMaxLoadCapacity( truck.getMaxLoadCapacity() );

        return truckResponse;
    }
}
