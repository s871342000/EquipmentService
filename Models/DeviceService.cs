using Models.Structures;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Model
{
    public class DeviceService
    {
        private readonly IMongoCollection<DeviceDetail> _collection;

        public DeviceService(IDatabaseSettings settings)
        {
            MongoClient client = new MongoClient(settings.ConnectionString);
            IMongoDatabase  db = client.GetDatabase(settings.DatabaseName);

            _collection = db.GetCollection<DeviceDetail>(settings.CollectionName);
        }

        public bool CheckLogin(string uid, string pwd){
            if(uid == "admin" && pwd == "@dmIn")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public List<DeviceDetail> Get() => _collection.Find(device => true).ToList();

        public List<DeviceDetail> GetByCustomer(string customer) => _collection.Find<DeviceDetail>(device => device.Customer == customer).ToList();

        public DeviceDetail GetBySn(string sn) => _collection.Find<DeviceDetail>(device => device.SN == sn).FirstOrDefault();

        public DeviceDetail Create(DeviceDetail device)
        {
            _collection.InsertOne(device);
            return device;
        }

        public void Update(DeviceDetail device) => _collection.ReplaceOne(_device => _device.SN == device.SN, device);

        public void Remove(string sn) => _collection.DeleteOne(device => device.SN == sn);

        
    }
}