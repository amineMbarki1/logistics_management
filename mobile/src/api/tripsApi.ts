import { Trip, TripRequest } from "@/features/trips/types";
import apiClient from "./apiClient";

export function createTrip(trip: TripRequest) {
  return apiClient.post("/trips", trip).then((res) => res.data);
}

export function getTrips() {
  return apiClient.get<Trip[]>("/trips").then((res) => res.data);
}
