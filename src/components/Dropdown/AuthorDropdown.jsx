import React from 'react';
import Select from 'react-select';

export default function AuthorDropdown({ authors, authorOptionClick }) {
  const options = authors.map((i, index) => {
    return {
      value: i,
      label: `#${index + 1} - ${i.author_name} ${i.author_lastname}`,
    };
  });
  return (
    <>
      <label className="form-label">Autor del libro</label>
      <Select
        options={options}
        onChange={authorOptionClick}
        placeholder="Selecciona una opción"
      />
    </>
  );
}
