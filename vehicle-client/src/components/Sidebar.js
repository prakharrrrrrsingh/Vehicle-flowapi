import React from 'react';

const Sidebar = ({ selected, onSelect }) => {
  const filters = ["All", "Available", "Rented", "Maintenance"];

  return (
    <div className="sidebar">
      <h2>Filters</h2>
      <ul>
        {filters.map((f) => (
          <li
            key={f}
            className={selected === f ? 'active' : ''}
            onClick={() => onSelect(f)}
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
