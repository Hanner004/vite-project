import React from 'react';
import Select from 'react-select';

export default function ClientDropdown({ clients, clientOptionClick }) {
  const options = clients.map((i) => {
    return {
      value: i,
      label: `DNI: ${i.client_dni} - ${i.client_name} ${i.client_lastname}`,
    };
  });
  return (
    <>
      <label className="form-label">Cliente de la reserva</label>
      <Select options={options} onChange={clientOptionClick} placeholder="Selecciona una opción" required />
    </>
  );
}
