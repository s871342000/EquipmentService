import { IRecord } from "./Record";
export interface IDeviceDetail {
  customer: string;
  model: string;
  sn: string;
  purchaseDate: Date;
  warrantyStartDate: Date;
  warrantyEndDate: Date;
  leaseStartDate: Date;
  leaseEndDate: Date;
  maintenanceStartDate: Date;
  maintenanceEndDate: Date;
  warrantyRecord: IRecord;
  leaseRecord: IRecord;
  maintenanceRecord: IRecord;
}
