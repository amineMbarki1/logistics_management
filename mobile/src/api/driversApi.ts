import apiClient from "./apiClient";
import { Driver, DriverRequest } from "@/features/drivers/types";

export async function createDriver(driver: DriverRequest) {
  return apiClient.post<Driver>("/drivers", driver).then((res) => res.data);
}

export function getDrivers() {
  return apiClient.get<Driver[]>("/drivers").then((res) => res.data);
}
