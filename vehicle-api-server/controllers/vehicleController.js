const Vehicle = require('../models/Vehicle');

const createVehicle = async (req, res) => {
  console.log("📥 Incoming POST body:", req.body);

  try {
    const { number, name, brand, year, status } = req.body;

    // 🔍 Validate required fields
    if (!number || !name || !brand || !year) {
      return res.status(400).json({
        message: "Fields 'number', 'name', 'brand', and 'year' are required."
      });
    }

    // 🔄 Check for duplicate vehicle number
    const existingVehicle = await Vehicle.findOne({ number });
    if (existingVehicle) {
      return res.status(400).json({
        message: `🚫 Vehicle with number '${number}' already exists.`
      });
    }

    // ✅ Create and save new vehicle
    const vehicle = new Vehicle({
      number,
      name,
      brand,
      year,
      status: status || 'Available'
    });

    const savedVehicle = await vehicle.save();
    res.status(201).json(savedVehicle);
  } catch (err) {
    console.error("❌ Failed to add vehicle:", err);
    res.status(500).json({ message: "❌ Server error while adding vehicle." });
  }
};

module.exports = { createVehicle };
