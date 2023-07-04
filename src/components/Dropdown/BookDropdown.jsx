import React from 'react';
import Select from 'react-select';

export default function BookDropdown({
  books,
  bookOptionClick,
  defaultValue,
  selectValue,
}) {
  const options = books.map((i) => {
    return {
      value: i,
      label: `#${i.book_id} - Nombre del libro: ${i.book_name} - ISBN: ${i.book_isbn_code}`,
    };
  });
  if (defaultValue?.value) {
    return (
      <>
        <Select
          key={defaultValue}
          defaultValue={defaultValue}
          options={options}
          onChange={bookOptionClick}
          placeholder="Selecciona una opción"
        />
      </>
    );
  } else {
    return (
      <>
        <Select
          options={options}
          onChange={bookOptionClick}
          placeholder="Selecciona una opción"
          value={selectValue}
        />
      </>
    );
  }
}
