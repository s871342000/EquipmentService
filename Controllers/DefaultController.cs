using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Models.Structures;
using Model;
using System.Linq;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DefaultController : ControllerBase
    {
        private readonly DeviceService _deviceService;

        public DefaultController(DeviceService service)
        {
            _deviceService = service;
        }

        [HttpGet]
        [Route("Customers")]
        public List<Customers> Customers()
        {
            List<DeviceDetail> devices = _deviceService.Get();
            
            List<Customers> customers = (from d in devices
                                        group d by d.Customer into g
                                        select new Customers{
                                            Name = g.Key,
                                            Devices = g.Select(d => new Device{ SN = d.SN, Model = d.Model}).ToList()
                                        }).ToList();

            return customers;
        }

        [HttpGet]
        [Route("DeviceDetail/{sn}")]
        public ActionResult<DeviceDetail> DeviceDetail(string sn)
        {
            DeviceDetail device = _deviceService.GetBySn(sn);

            if(device == null)
            {
                return NotFound();
            }

            return device;
        }

        [HttpGet]
        [Route("AllDevices/{customer}")]
        public List<ExportDevice> AllDevices(string customer)
        {
            List<DeviceDetail> devices = _deviceService.GetByCustomer(customer);

            List<ExportDevice> export = new List<ExportDevice>();

            foreach(var device in devices)
            {
                foreach(var rec in device.MaintenanceRecord)
                {
                    var query = export.Where(d => d.SN == device.SN && d.Date == rec.Date).FirstOrDefault();

                    if(query == null)
                    {
                        export.Add(new ExportDevice{
                            SN = device.SN,
                            Model = device.Model,
                            Version = device.Version,
                            PurchaseDate = device.PurchaseDate,
                            WarrantyStartDate = device.WarrantyStartDate,
                            WarrantyEndDate = device.WarrantyEndDate,
                            LeaseStartDate = device.LeaseStartDate,
                            LeaseEndDate = device.LeaseEndDate,
                            MaintenanceStartDate = device.MaintenanceStartDate,
                            MaintenanceEndDate = device.MaintenanceEndDate,
                            Date = rec.Date,
                            MaintenanceItem = string.Join(",", rec.Items)
                        });
                    }
                    else
                    {
                        query.Date = rec.Date;
                        query.MaintenanceItem = string.Join(",", rec.Items);
                    }
                }

                foreach(var rec in device.RepairRecord)
                {
                    var query = export.Where(d => d.SN == device.SN && d.Date == rec.Date).FirstOrDefault();

                    if(query == null)
                    {
                        export.Add( new ExportDevice{
                            SN = device.SN,
                            Model = device.Model,
                            Version = device.Version,
                            PurchaseDate = device.PurchaseDate,
                            WarrantyStartDate = device.WarrantyStartDate,
                            WarrantyEndDate = device.WarrantyEndDate,
                            LeaseStartDate = device.LeaseStartDate,
                            LeaseEndDate = device.LeaseEndDate,
                            MaintenanceStartDate = device.MaintenanceStartDate,
                            MaintenanceEndDate = device.MaintenanceEndDate,
                            Date = rec.Date,
                            RepairComment = rec.Comment
                        });
                    }
                    else
                    {
                        query.Date = rec.Date;
                        query.RepairComment = rec.Comment;
                    }
                }

                foreach(var rec in device.RevisionRecord)
                {
                    var query = export.Where(d => d.SN == device.SN && d.Date == rec.Date).FirstOrDefault();

                    if(query == null)
                    {
                        export.Add( new ExportDevice{
                            SN = device.SN,
                            Model = device.Model,
                            Version = device.Version,
                            PurchaseDate = device.PurchaseDate,
                            WarrantyStartDate = device.WarrantyStartDate,
                            WarrantyEndDate = device.WarrantyEndDate,
                            LeaseStartDate = device.LeaseStartDate,
                            LeaseEndDate = device.LeaseEndDate,
                            MaintenanceStartDate = device.MaintenanceStartDate,
                            MaintenanceEndDate = device.MaintenanceEndDate,
                            Date = rec.Date,
                            RevisionVersion = rec.Version
                        });
                    }
                    else
                    {
                        query.Date = rec.Date;
                        query.RevisionVersion = rec.Version;
                    }
                }
            }

            

            return export;
        }

        [HttpPost]
        [Route("Login")]
        public bool Login([FromBody]UserInfo userInfo)
        {
            // string uid = Crypto.Encrypto(userInfo.Uid);
            // string pwd = Crypto.Encrypto($"{userInfo.Uid}roy{userInfo.Pwd}");

            return _deviceService.CheckLogin(userInfo.Uid, userInfo.Pwd);
        }

        [HttpPost]
        [Route("Create/{uid}/{pwd}")]
        public Status Create(string uid, string pwd, [FromBody]DeviceDetail data)
        {
            if(!_deviceService.CheckLogin(uid, pwd))
            {
                return null;
            }

            DeviceDetail _device = _deviceService.GetBySn(data.SN);

            Status status = new Status();
            if(_device == null)
            {
                _deviceService.Create(data);
                status.Success = true;
            }
            else
            {
                status.Success = false;
                status.Message = "機號已存在";
            }

            return status;
        }

        [HttpPost]
        [Route("Update/{uid}/{pwd}")]
        public Status Update(string uid, string pwd, [FromBody]DeviceDetail data)
        {
            if(!_deviceService.CheckLogin(uid, pwd))
            {
                return null;
            }

            DeviceDetail _device = _deviceService.GetBySn(data.SN);
            data.Id = _device.Id;

            Status status = new Status();

            try
            {
                _deviceService.Update(data);
                status.Success = true;
            }
            catch(Exception ex)
            {
                status.Success = false;
                status.Message = ex.ToString();
            }

            return status;
        }

        [HttpDelete]
        [Route("Delete/{uid}/{pwd}/{sn}")]
        public void Delete(string uid, string pwd, string sn)
        {
            if(_deviceService.CheckLogin(uid, pwd))
            {
                _deviceService.Remove(sn);
            }
        }
    }
}
