const express = require('express');
const cors = require('cors');
const Vehicle = require('./models/Vehicle');

const app = express();

// ✅ Enable CORS for Netlify frontend
app.use(cors({
  origin: 'https://courageous-lolly-d50a78.netlify.app', // update this if frontend domain changes
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ------------------ API Routes ------------------

// ✅ GET all vehicles
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET single vehicle by ID
app.get('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: 'Invalid vehicle ID' });
  }
});

// ✅ POST create new vehicle
app.post('/api/vehicles', async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Vehicle creation failed' });
  }
});

// ✅ PUT update vehicle
app.put('/api/vehicles/:id', async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
});

// ✅ DELETE vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed' });
  }
});

// ✅ Export app
module.exports = app;
