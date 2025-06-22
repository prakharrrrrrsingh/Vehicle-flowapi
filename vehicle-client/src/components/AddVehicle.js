import React, { useState } from 'react';
import api from '../api';

function AddVehicle({ onAdd }) {
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    brand: '',
    year: '',
    status: 'Available'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.number || !formData.name || !formData.brand || !formData.year) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const res = await api.post('/vehicles', formData);
      onAdd(res.data);
      setFormData({ number: '', name: '', brand: '', year: '', status: 'Available' });
    } catch (err) {
      console.error('❌ Vehicle Add Error:', err.response?.data || err.message);
      alert('Failed to add vehicle. See console for details.');
    }
  };

  return (
    <form className="add-vehicle-form" onSubmit={handleSubmit}>
      <input type="text" name="number" placeholder="Vehicle Number" value={formData.number} onChange={handleChange} required />
      <input type="text" name="name" placeholder="Vehicle Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
      <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Available">Available</option>
        <option value="Rented">Rented</option>
        <option value="Maintenance">Maintenance</option>
      </select>
      <button type="submit">Add Vehicle</button>
    </form>
  );
}

export default AddVehicle;
