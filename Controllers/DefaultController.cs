using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Structures;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DefaultController : ControllerBase
    {
        private readonly ILogger<DefaultController> _logger;

        public DefaultController(ILogger<DefaultController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("Login")]
        public bool Login([FromBody]UserInfo logInfo)
        {
            if(logInfo.Uid == "admin" && logInfo.Pwd == "admin")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpGet]
        [Route("Customers")]
        public List<Customers> Customers()
        {
            return new List<Customers>{
                new Customers{
                    Name = "客戶A",
                    Devices = new List<Device>{
                        new Device{
                            SN = "123",
                            Model = "RL-750s"
                        },
                        new Device{
                            SN = "123",
                            Model = "RL-750s"
                        },
                        new Device{
                            SN = "123",
                            Model = "RL-750s"
                        },
                    }
                },
                new Customers{
                    Name = "客戶B",
                    Devices = new List<Device>{
                        new Device{
                            SN = "489",
                            Model = "RL-750s"
                        },
                        new Device{
                            SN = "123",
                            Model = "RL-750s"
                        },
                        new Device{
                            SN = "254",
                            Model = "RL-750s"
                        },
                    }
                },
                new Customers{
                    Name = "客戶C",
                    Devices = new List<Device>{
                        new Device{
                            SN = "157",
                            Model = "RL-750s"
                        },
                        new Device{
                            SN = "123",
                            Model = "RL-750s"
                        },
                        new Device{
                            SN = "456",
                            Model = "RL-750s"
                        },
                    }
                },
                new Customers{
                    Name = "客戶D",
                    Devices = new List<Device>{
                        new Device{
                            SN = "123",
                            Model = "RL-750s"
                        },
                        new Device{
                            SN = "194",
                            Model = "RL-750s"
                        },
                        new Device{
                            SN = "123",
                            Model = "RL-750s"
                        },
                    }
                }
            };
        }

        [HttpGet]
        [Route("DeviceDetail/{sn}")]
        public DeviceDetail DeviceDetail(string sn)
        {
            DeviceDetail deviceDetail = new DeviceDetail();

            if(sn == "123")
            {
                deviceDetail = new DeviceDetail{
                    Customer = "客戶A",
                    SN = "123456",
                    Model = "RL-750s",
                    Version = "12.2",
                    PurchaseDate = DateTime.Now.Date.Date,
                    WarrantyStartDate = DateTime.Now.Date,
                    WarrantyEndDate = new DateTime(2021,1,1),
                    LeaseStartDate = DateTime.Now.Date,
                    LeaseEndDate = DateTime.Now.Date,
                    MaintenanceStartDate = DateTime.Now.Date,
                    MaintenanceEndDate = DateTime.Now.Date,
                    MaintenanceRecord = new List<Maintenance>{
                        new Maintenance{
                            Date = DateTime.Now.Date
                        },
                        new Maintenance{
                            Date = DateTime.Now.AddDays(-1).Date
                        }
                    },
                    RepairRecord = new List<Repair>{
                        new Repair{
                            Date = DateTime.Now.Date,
                            Comment = "保養"
                        },
                        new Repair{
                            Date = DateTime.Now.Date,
                            Comment = "測試"
                        }
                    },
                    RevisionRecord = new List<Revision>{
                        new Revision{
                            Date = DateTime.Now.Date,
                            Version = "50.4"
                        },
                        new Revision{
                            Date = DateTime.Now.Date,
                            Version = "30.4"
                        }
                    }
                };
            }

            if(sn == "456")
            {
                deviceDetail = new DeviceDetail{
                    Customer = "客戶D",
                    SN = "999999",
                    Model = "RL-750s",
                    Version = "12.2",
                    PurchaseDate = DateTime.Now.Date.Date,
                    WarrantyStartDate = DateTime.Now.Date,
                    WarrantyEndDate = DateTime.Now.Date,
                    LeaseStartDate = DateTime.Now.Date,
                    LeaseEndDate = DateTime.Now.Date,
                    MaintenanceStartDate = DateTime.Now.Date,
                    MaintenanceEndDate = DateTime.Now.Date
                };
            }


            return deviceDetail;
        }
    }
}
