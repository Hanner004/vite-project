import React from 'react';
import Select from 'react-select';

export default function EditorialDropdown({
  editorials,
  editorialOptionClick,
}) {
  const options = editorials.map((i, index) => {
    return {
      value: i,
      label: `#${index + 1} - ${i.editorial_name}`,
    };
  });
  return (
    <>
      <label className="form-label">Editorial del libro</label>
      <Select
        options={options}
        onChange={editorialOptionClick}
        placeholder="Selecciona una opción"
      />
    </>
  );
}
