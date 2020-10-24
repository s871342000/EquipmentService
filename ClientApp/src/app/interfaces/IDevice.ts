import { IRecord } from "./IRecord";

export interface IDeviceDetail {
  customer: string,
  sn: string,
  model: string,
  version: string,
  price: number,
  purchaseDate: Date,
  warrantyStart: Date,
  warrantyEnd: Date,
  leaseStart: Date,
  leaseEnd: Date,
  maintenanceStart: Date,
  maintenanceEnd: Date
}

export interface IMaintenance{
  date:Date,
  items: string[]
}

export interface IRepair{
  date:Date,
  comment:string
}

export interface IRevision{
  date:Date,
  version:string
}