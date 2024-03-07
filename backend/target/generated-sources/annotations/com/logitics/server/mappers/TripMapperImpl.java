package com.logitics.server.mappers;

import com.logitics.server.dto.LocationRequest;
import com.logitics.server.dto.LocationResponse;
import com.logitics.server.dto.TripRequest;
import com.logitics.server.model.Location;
import com.logitics.server.model.Trip;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-06T00:36:06+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
public class TripMapperImpl implements TripMapper {

    @Override
    public Trip toTrip(TripRequest tripRequest) {
        if ( tripRequest == null ) {
            return null;
        }

        Trip trip = new Trip();

        trip.setStartLocation( toLocation( tripRequest.getStartLocation() ) );
        trip.setDestination( toLocation( tripRequest.getDestination() ) );
        trip.setWeight( tripRequest.getWeight() );
        trip.setHeight( tripRequest.getHeight() );
        trip.setWidth( tripRequest.getWidth() );
        trip.setLength( tripRequest.getLength() );
        trip.setTask( tripRequest.getTask() );
        trip.setScheduledDepartureTime( tripRequest.getScheduledDepartureTime() );

        return trip;
    }

    @Override
    public Location toLocation(LocationRequest locationRequest) {
        if ( locationRequest == null ) {
            return null;
        }

        Location location = new Location();

        location.setDisplayName( locationRequest.getDisplayName() );
        location.setLatitude( locationRequest.getLatitude() );
        location.setLongitude( locationRequest.getLongitude() );

        return location;
    }

    @Override
    public LocationResponse toLocationResponse(Location location) {
        if ( location == null ) {
            return null;
        }

        LocationResponse locationResponse = new LocationResponse();

        locationResponse.setDisplayName( location.getDisplayName() );
        locationResponse.setLatitude( location.getLatitude() );
        locationResponse.setLongitude( location.getLongitude() );

        return locationResponse;
    }
}
