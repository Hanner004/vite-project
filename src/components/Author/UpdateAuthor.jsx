import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {authorAPI} from "../../utils/routesFormat";

export default function UpdateAuthor() {
  const navigate = useNavigate();
  const {authorId} = useParams();

  const [authorName, setAuthorName] = useState("");
  const [authorLastname, setAuthorLastname] = useState("");

  function getAuthorById() {
    fetch(authorAPI + `/${authorId}`)
      .then((response) => response.json())
      .then((data) => {
        setAuthorName(data.author_name);
        setAuthorLastname(data.author_lastname);
      })
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    getAuthorById();
  }, []);

  function handleUpdate(event) {
    event.preventDefault();
    fetch(authorAPI + `/${authorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: authorName,
        lastname: authorLastname,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message))
      .finally(() => {
        Swal.fire({
          icon: "success",
          title: "Autor editado",
          text: "Autor actualizado correctamente.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/author");
      });
  }

  const handleCancel = () => {
    navigate("/author");
  };

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleUpdate} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Actualizar autor #{`${authorId}`}</h3>
          </div>
          <div className="form-body p-3 border-bottom">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={authorName}
                required
                onChange={(e) => {
                  setAuthorName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                value={authorLastname}
                required
                onChange={(e) => {
                  setAuthorLastname(e.target.value);
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
