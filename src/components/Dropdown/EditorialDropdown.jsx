import React from "react";

export default function EditorialDropdown({editorials, editorialOptionClick}) {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Editorial del libro&nbsp;
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {editorials.map((option, index) => (
          <a key={option.editorial_id} className="dropdown-item" onClick={() => editorialOptionClick(option)}>
            #{index + 1} - {option.editorial_name}
          </a>
        ))}
      </div>
    </div>
  );
}
