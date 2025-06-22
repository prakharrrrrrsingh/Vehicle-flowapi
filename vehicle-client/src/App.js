import React, { useState, useEffect } from 'react';
import AddVehicle from './components/AddVehicle';
import VehicleCard from './components/VehicleCard';
import Sidebar from './components/Sidebar';
import api from './api';  // ✅ Use centralized API
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.get('/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.error("❌ Fetch error", err));
  }, []);

  const filteredVehicles = filter === "All"
    ? vehicles
    : vehicles.filter(v => v.status === filter);

  return (
    <div className="dashboard">
      <Sidebar selected={filter} onSelect={setFilter} />
      <div className="main">
        <h1>🚗 VehicleFlow API</h1>
        <AddVehicle onAdd={(newVehicle) => setVehicles([...vehicles, newVehicle])} />
        <div className="card-grid">
          {filteredVehicles.length === 0 ? (
            <p className="empty">No vehicles found<br />Add your first vehicle to get started.</p>
          ) : (
            filteredVehicles.map((v) => <VehicleCard key={v._id} vehicle={v} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
