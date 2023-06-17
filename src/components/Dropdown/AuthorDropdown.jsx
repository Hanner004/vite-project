import React from 'react';
import Select from 'react-select';

export default function AuthorDropdown({
  authors,
  authorOptionClick,
  defaultValue,
}) {
  const options = authors.map((i) => {
    return {
      value: i,
      label: `#${i.author_id} - ${i.author_name} ${i.author_lastname}`,
    };
  });
  if (defaultValue?.value) {
    return (
      <>
        <label className="form-label">Autor del libro</label>
        <Select
          key={defaultValue}
          defaultValue={defaultValue}
          options={options}
          onChange={authorOptionClick}
          placeholder="Selecciona una opción"
        />
      </>
    );
  } else {
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
}
