const express = require('express');
const router = express.Router();
const { createVehicle } = require('../controllers/vehicleController');

// POST route
router.post('/vehicles', createVehicle);

module.exports = router;
