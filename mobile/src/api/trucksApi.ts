import apiClient from "./apiClient";
import { Truck, TruckRequest } from "@/features/trucks/types";

export async function createTruck(truck: TruckRequest) {
  return await apiClient.post<Truck>("/trucks", truck).then((res) => res.data);
}

export async function getTrucks() {
  return await apiClient.get<Truck[]>("/trucks").then((res) => res.data);
}


