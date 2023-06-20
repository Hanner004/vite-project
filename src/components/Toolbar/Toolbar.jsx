import React from 'react';
import { Link } from 'react-router-dom';

export default function Toolbar({
  showBtn,
  toPath,
  searchTerm,
  setSearchTerm,
  placeholder,
}) {
  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };
  if (showBtn) {
    return (
      <div className="row mb-4 justify-content-between">
        <div className="col">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={handleOnChange}
            placeholder={placeholder}
          />
        </div>
        <div className="col-auto">
          <Link to={toPath} className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row mb-4 justify-content-between">
        <div className="col">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={handleOnChange}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
}
