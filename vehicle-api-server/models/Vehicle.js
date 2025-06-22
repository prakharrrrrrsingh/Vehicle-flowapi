const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Maintenance'],
    default: 'Available'
  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
