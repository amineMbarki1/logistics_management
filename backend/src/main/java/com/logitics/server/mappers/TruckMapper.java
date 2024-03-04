package com.logitics.server.mappers;

import com.logitics.server.dto.TruckRequest;
import com.logitics.server.dto.TruckResponse;
import com.logitics.server.model.Truck;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TruckMapper {
    TruckMapper INSTANCE = Mappers.getMapper(TruckMapper.class);

    @Mapping(target = "id", ignore = true)
    Truck toTruck(TruckRequest truckRequest);

    TruckResponse toTruckResponse(Truck truck);
}
