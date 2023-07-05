import React from 'react';
import Select from 'react-select';

export default function EditorialDropdown({
  editorials,
  editorialOptionClick,
  defaultValue,
}) {
  const options = editorials.map((i) => {
    return {
      value: i,
      label: `ID: ${i.editorial_id} - ${i.editorial_name}`,
    };
  });
  if (defaultValue?.value) {
    return (
      <>
        <label className="form-label">Editorial del libro</label>
        <Select
          key={defaultValue}
          defaultValue={defaultValue}
          options={options}
          onChange={editorialOptionClick}
          placeholder="Selecciona una opción"
          required
        />
      </>
    );
  } else {
    return (
      <>
        <label className="form-label">Editorial del libro</label>
        <Select
          options={options}
          onChange={editorialOptionClick}
          placeholder="Selecciona una opción"
          required
        />
      </>
    );
  }
}
