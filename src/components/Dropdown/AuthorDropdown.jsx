import React from 'react';

export default function AuthorDropdown({ authors, authorOptionClick }) {
  return (
    <select className="form-control">
      <option value="">...</option>
      {authors.map((option, index) => (
        <option
          key={option.author_id}
          onClick={() => authorOptionClick(option)}
        >
          #{index + 1} - {option.author_name} {option.author_lastname}
        </option>
      ))}
    </select>
  );
}
