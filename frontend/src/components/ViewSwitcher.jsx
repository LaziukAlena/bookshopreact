import React from 'react';
import { FaTable, FaBook } from 'react-icons/fa';

const ViewSwitcher = ({ view, onChange }) => {
  return (
    <div className="view-switcher">
      <button
        type="button"
        className={`btn ${view === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => onChange('table')}
      >
        <FaTable /> 
      </button>
      <button
        type="button"
        className={`btn ${view === 'gallery' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => onChange('gallery')}
      >
        <FaBook /> 
      </button>
    </div>
  );
};

export default ViewSwitcher;




