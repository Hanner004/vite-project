import React from "react";

export default function AuthorDropdown({authors, authorOptionClick}) {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Autor del libro&nbsp;
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {authors?.map((option, index) => (
          <a key={option.author_id} className="dropdown-item" onClick={() => authorOptionClick(option)}>
            #{index + 1} - {option.author_name} {option.author_lastname}
          </a>
        ))}
      </div>
    </div>
  );
}
