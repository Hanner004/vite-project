import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { ReservationStatusEnum } from '../../utils/enums/reservation.enum';

export default function ToolbarReservation({ toPath, searchTerm, setSearchTerm, placeholder, setStatus }) {
  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const statusOptionClick = (status) => {
    if (status === null) {
      setStatus(null);
    } else {
      setStatus(status.value);
    }
  };
  const options = Object.entries(ReservationStatusEnum).map(([key, value]) => ({
    label: value,
    value: value,
  }));
  return (
    <div className="row mb-4 justify-content-between">
      <div className="col">
        <input type="text" className="form-control" value={searchTerm} onChange={handleOnChange} placeholder={placeholder} />
      </div>
      <div className="col">
        <Select options={options} onChange={statusOptionClick} placeholder="Estado" isClearable />
      </div>
      <div className="col-auto">
        <Link to={toPath} className="btn btn-outline-primary">
          <i className="fa-solid fa-circle-plus"></i> Añadir
        </Link>
      </div>
    </div>
  );
}
