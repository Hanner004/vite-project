import React from 'react';

export default function EditorialDropdown({
  editorials,
  editorialOptionClick,
}) {
  return (
    <select className="form-control">
      <option value="">...</option>
      {editorials.map((option, index) => (
        <option
          key={option.editorial_id}
          onClick={() => editorialOptionClick(option)}
        >
          #{index + 1} - {option.editorial_name}
        </option>
      ))}
    </select>
  );
}
