const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
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
  await Vehicle.deleteMany({});
});

describe('API: Vehicle Endpoints', () => {
  it('GET /api/vehicles should return empty array initially', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/vehicles should create a new vehicle', async () => {
    const vehicleData = {
      number: 'XYZ123',
      name: 'Swift',
      brand: 'Maruti',
      year: 2020
    };

    const res = await request(app)
      .post('/api/vehicles')
      .send(vehicleData);

    expect(res.statusCode).toBe(201);
    expect(res.body.number).toBe('XYZ123');
  });

  it('GET /api/vehicles/:id should return a specific vehicle', async () => {
    const vehicle = await Vehicle.create({
      number: 'DL01AB1234',
      name: 'i20',
      brand: 'Hyundai',
      year: 2022
    });

    const res = await request(app).get(`/api/vehicles/${vehicle._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('i20');
  });

  it('PUT /api/vehicles/:id should update a vehicle', async () => {
    const vehicle = await Vehicle.create({
      number: 'KA09XY9999',
      name: 'Alto',
      brand: 'Suzuki',
      year: 2019
    });

    const res = await request(app)
      .put(`/api/vehicles/${vehicle._id}`)
      .send({ name: 'Alto K10' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Alto K10');
  });

  it('DELETE /api/vehicles/:id should remove a vehicle', async () => {
    const vehicle = await Vehicle.create({
      number: 'MH12YZ1234',
      name: 'Nexon',
      brand: 'Tata',
      year: 2021
    });

    const res = await request(app).delete(`/api/vehicles/${vehicle._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Vehicle deleted');
  });

  it('GET /api/vehicles/:id with invalid ID should return 400', async () => {
    const res = await request(app).get('/api/vehicles/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  it('PUT /api/vehicles/:id with non-existing ID should return 404', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app).put(`/api/vehicles/${id}`).send({ name: 'Updated' });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/vehicles/:id with non-existing ID should return 404', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/vehicles/${id}`);
    expect(res.statusCode).toBe(404);
  });
});
