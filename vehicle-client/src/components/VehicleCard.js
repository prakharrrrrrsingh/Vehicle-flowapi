import React from 'react';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="vehicle-card">
      <h3>{vehicle.name}</h3>
      <p><strong>Brand:</strong> {vehicle.brand}</p>
      <p><strong>Year:</strong> {vehicle.year}</p>
      <p><strong>Status:</strong> {vehicle.status || 'Available'}</p>
    </div>
  );
};

export default VehicleCard;
