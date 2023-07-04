import React from 'react';
import Select from 'react-select';

export default function ClientDropdown({ clients, clientOptionClick, defaultValue }) {
  const options = clients.map((i) => {
    return {
      value: i,
      label: `DNI: ${i.client_dni} - ${i.client_name} ${i.client_lastname}`,
    };
  });
  if (defaultValue?.value) {
    return (
      <>
        <label className="form-label">Cliente de la reserva</label>
        <Select
          key={defaultValue}
          defaultValue={defaultValue}
          options={options}
          onChange={clientOptionClick}
          placeholder="Selecciona una opción"
        />
      </>
    );
  } else {
    return (
      <>
        <label className="form-label">Cliente de la reserva</label>
        <Select
          options={options}
          onChange={clientOptionClick}
          placeholder="Selecciona una opción"
        />
      </>
    );
  }
}
