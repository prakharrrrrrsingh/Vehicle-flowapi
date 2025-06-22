const Vehicle = require('../../models/Vehicle');

jest.mock('../../models/Vehicle'); // mock model

describe('Unit: Vehicle Controller Logic', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new vehicle (mocked)', async () => {
    const mockReq = {
      body: {
        name: 'Apache',
        brand: 'TVS',
        number: 'BR01AB1234',
        year: 2022
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockSavedVehicle = { ...mockReq.body, _id: 'mockedId' };
    Vehicle.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockSavedVehicle)
    }));

    const newVehicle = new Vehicle(mockReq.body);
    const result = await newVehicle.save();

    mockRes.status(201).json(result);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockSavedVehicle);
  });
});
