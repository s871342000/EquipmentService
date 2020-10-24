using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models.Structures
{
    public class DeviceDetail
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get;set;}
        public string Customer { get ;set; }                        // 客戶名稱
        public string SN { get; set; }                              // 機號  
        public string Model { get; set; }                           // 機型
        public string Version { get; set; }                         // 版本
        public int Price {get;set;}                                 // 售價
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime PurchaseDate { get; set; }                  // 購買日期
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime WarrantyStartDate { get; set; }             // 保固起始日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime WarrantyEndDate { get; set; }               // 保固到期日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime LeaseStartDate { get; set; }                // 租賃起始日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime LeaseEndDate { get; set; }                  // 租賃到期日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime MaintenanceStartDate { get; set; }          // 保養起始日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime MaintenanceEndDate { get; set; }            // 保養到期日
        public List<Maintenance> MaintenanceRecord { get; set; }    // 保養紀錄
        public List<Repair> RepairRecord { get; set; }              // 維修紀錄
        public List<Revision> RevisionRecord { get; set; }          // 改版紀錄           
    }

    public class ExportDevice 
    {
        public string SN { get; set; }                      // 機號  
        public string Model { get; set; }                   // 機型
        public string Version { get; set; }                 // 版本
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime PurchaseDate { get; set; }          // 購買日期
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime WarrantyStartDate { get; set; }     // 保固起始日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime WarrantyEndDate { get; set; }       // 保固到期日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime LeaseStartDate { get; set; }        // 租賃起始日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime LeaseEndDate { get; set; }          // 租賃到期日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime MaintenanceStartDate { get; set; }  // 保養起始日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime MaintenanceEndDate { get; set; }    // 保養到期日
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime Date { get; set; }                  // 日期
        public string MaintenanceItem { get; set; }         // 保養項目
        public string RepairComment { get; set; }           // 維修內容  
        public string RevisionVersion { get; set; }         // 改版版本  
    }
}