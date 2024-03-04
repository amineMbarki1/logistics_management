import { LatLng } from "react-native-maps";
import { Driver } from "../drivers/types";
import { Truck } from "../trucks/types";

export interface Location extends LatLng{
  displayName: string;
}

export interface Trip {
  id: number;
  driver: Driver;
  truck: Truck;
  startLocation: Location;
  destination: Location;
  weight: number;
  height: number;
  width: number;
  length: number;
  task: string;
  departureTime: Date;
}

export type TripFormFields = Omit<Trip, "id">;

export type TripRequest = Omit<
  TripFormFields,
  "driver" | "truck" | "departureTime"
> & {
  driverId: number;
  truckId: number;
  
}   ;
