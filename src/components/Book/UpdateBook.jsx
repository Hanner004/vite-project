import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {booksAPI} from "../../utils/routesFormat";

export default function UpdateBook() {
  const navigate = useNavigate();
  const {bookId} = useParams();

  const [bookName, setBookName] = useState("");
  const [bookLastname, setBookLastname] = useState("");

  function getBookById() {
    fetch(booksAPI + `/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        setBookName(data.book_name);
        setBookLastname(data.book_lastname);
      })
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    getBookById();
  }, []);

  function handleUpdate(event) {
    event.preventDefault();
    fetch(booksAPI + `/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bookName,
        lastname: bookLastname,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message))
      .finally(() => {
        Swal.fire({
          icon: "success",
          title: "Libro editado",
          text: "Libro actualizado correctamente.",
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
        <form onSubmit={handleUpdate} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Actualizar autor #{`${bookId}`}</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={bookName}
                required
                onChange={(e) => {
                  setBookName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                value={bookLastname}
                required
                onChange={(e) => {
                  setBookLastname(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-footer p-3">
            <button type="submit" className="btn btn-primary mr-2">
              Actualizar
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
}
