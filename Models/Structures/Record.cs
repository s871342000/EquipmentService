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
        public List<string> Items { get; set; } 
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