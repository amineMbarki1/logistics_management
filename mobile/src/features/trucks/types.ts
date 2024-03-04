export interface Truck {
  photo: string;
  number: string;
  brand: string;
  modelNumber: string;
  maxLoadCapacity: 0;
  id: number;
}

export type TruckRequest = Omit<Truck, "id">;
