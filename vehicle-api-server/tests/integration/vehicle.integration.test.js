const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Vehicle = require('../../models/Vehicle');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri(), { dbName: 'test' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await Vehicle.deleteMany(); // cleanup
});

describe('Integration: Vehicle Model + DB', () => {
  test('should save and fetch a vehicle from DB', async () => {
    const vehicleData = {
      name: 'Honda City',
      brand: 'Honda',
      number: 'DL1ABC1234',
      year: 2020
    };

    const vehicle = new Vehicle(vehicleData);
    const saved = await vehicle.save();

    expect(saved._id).toBeDefined();
    expect(saved.name).toBe(vehicleData.name);

    const fromDb = await Vehicle.findById(saved._id);
    expect(fromDb.number).toBe(vehicleData.number);
  });
});
