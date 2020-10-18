using System;
using System.Collections.Generic;

namespace Models.Structures
{
    public class DeviceDetail
    {
        public string Customer { get ;set; }                        // 客戶名稱
        public string SN { get; set; }                              // 機號  
        public string Model { get; set; }                           // 機型
        public string Version { get; set; }                         // 版本
        public DateTime PurchaseDate { get; set; }                  // 購買日期
        public DateTime WarrantyStartDate { get; set; }             // 保固起始日
        public DateTime WarrantyEndDate { get; set; }               // 保固到期日
        public DateTime LeaseStartDate { get; set; }                // 租賃起始日
        public DateTime LeaseEndDate { get; set; }                  // 租賃到期日
        public DateTime MaintenanceStartDate { get; set; }          // 保養起始日
        public DateTime MaintenanceEndDate { get; set; }            // 保養到期日
        public List<Maintenance> MaintenanceRecord { get; set; }    // 保養紀錄
        public List<Repair> RepairRecord { get; set; }              // 維修紀錄
        public List<Revision> RevisionRecord { get; set; }          // 改版紀錄           
    }
}