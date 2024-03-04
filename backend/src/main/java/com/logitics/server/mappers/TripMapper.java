package com.logitics.server.mappers;


import com.logitics.server.dto.LocationRequest;
import com.logitics.server.dto.LocationResponse;
import com.logitics.server.dto.TripResponse;
import com.logitics.server.model.Location;
import com.logitics.server.model.Trip;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.logitics.server.dto.TripRequest;
import org.springframework.beans.BeanUtils;

@Mapper
public interface TripMapper {
    TripMapper INSTANCE = Mappers.getMapper(TripMapper.class);

    Trip toTrip(TripRequest tripRequest);

    Location toLocation(LocationRequest locationRequest);

    LocationResponse toLocationResponse(Location location);

    default TripResponse toTripResponse(Trip trip) {
        var truckResponse = TruckMapper.INSTANCE.toTruckResponse(trip.getTruck());
        var driverResponse = new DriverMapper().toDriverResponse(trip.getDriver());
        var startLocation = toLocationResponse(trip.getStartLocation());
        var destination = toLocationResponse(trip.getDestination());
        TripResponse tripResponse = new TripResponse();

        BeanUtils.copyProperties(trip, tripResponse);

        tripResponse.setTruck(truckResponse);
        tripResponse.setDriver(driverResponse);
        tripResponse.setStartLocation(startLocation);
        tripResponse.setDestination(destination);

        return tripResponse;
    };


}
