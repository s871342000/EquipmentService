using System;
using System.Collections.Generic;

namespace Models.Structures
{
    public class Record
    {
        public DateTime Date { get; set; }
    }

    public class Maintenance : Record
    {
        public List<string> Items { get; set; } = new List<string>{ "清潔保養", "紅外校正", "機件調整", "功能測試" };
    }

    public class Repair : Record
    {
        public string Comment { get; set; }
    }

    public class Revision : Record
    {
        public string Version { get; set; }
    }
}