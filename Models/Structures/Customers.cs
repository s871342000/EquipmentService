using System.Collections.Generic;

namespace Models.Structures
{
    public class Customers
    {
        public string Name { get; set; }
        public List<Device> Devices { get; set; }
    }

    public class Device
    {
        public string SN { get; set; }
        public string Model { get; set; }
    }
}