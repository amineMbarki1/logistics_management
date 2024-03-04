export interface Driver {
  id: number;
  phoneNumber: string;
  name: string;
  licenseNumber: string;
  photo: string;
}

export type DriverRequest = Omit<Driver, "id">;
