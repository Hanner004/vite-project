import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import EditorialDropdown from "../Dropdown/EditorialDropdown";
import AuthorDropdown from "../Dropdown/AuthorDropdown";

import {booksAPI, editorialAPI, authorAPI} from "../../utils/routesFormat";

export default function CreateBook() {
  const navigate = useNavigate();
  //book-state
  const [bookName, setBookName] = useState("");
  const [bookAvailableQuantity, setBookAvailableQuantity] = useState(null);
  const [bookLibraryLocation, setBookLibraryLocation] = useState("");

  //dropdown-editorials
  const [editorials, setEditorials] = useState([]);
  const [editorialOption, setEditorialOption] = useState({});

  //dropdown-authors
  const [authors, setAuthors] = useState([]);
  const [authorOption, setAuthorOption] = useState({});

  useEffect(() => {
    getEditorials();
    getAuthor();
  }, []);

  function getEditorials() {
    fetch(editorialAPI)
      .then((response) => response.json())
      .then((data) => setEditorials(data))
      .catch((error) => console.log(error.message));
  }

  function getAuthor() {
    fetch(authorAPI)
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.log(error.message));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(booksAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bookName,
        available_quantity: bookAvailableQuantity,
        library_location: bookLibraryLocation,
        authorId: authorOption.author_id,
        editorialId: editorialOption.editorial_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message))
      .finally(() => {
        Swal.fire({
          icon: "success",
          title: "Libro agregado",
          text: "Libro agregado correctamente.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/book");
      });
  }

  const handleCancel = () => {
    navigate("/book");
  };

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleSubmit} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Agregar libro</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                required
                onChange={(e) => {
                  setBookName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cantidad MAX</label>
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad MAX"
                required
                onChange={(e) => {
                  setBookAvailableQuantity(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ubicación en la biblioteca</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ubicación en la biblioteca"
                required
                onChange={(e) => {
                  setBookLibraryLocation(e.target.value);
                }}
              />
            </div>
            <div className="row mb-3">
              <div className="col-2">
                <EditorialDropdown editorials={editorials} editorialOptionClick={(option) => editorialOptionClick(option)} />
              </div>
              <div className="col-10">
                <input type="text" className="form-control" placeholder="Editorial" required disabled value={editorialOption.editorial_name} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-2">
                <AuthorDropdown authors={authors} authorOptionClick={(option) => authorOptionClick(option)} />
              </div>
              <div className="col-10">
                <input type="text" className="form-control" placeholder="Autor" required disabled value={authorOption.author_name} />
              </div>
            </div>
          </div>
          <div className="form-footer p-3">
            <button type="submit" className="btn btn-primary mr-2">
              Agregar
            </button>
            &nbsp;
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  function editorialOptionClick(option) {
    setEditorialOption(option);
  }

  function authorOptionClick(option) {
    setAuthorOption(option);
  }
}
