import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {authorAPI} from "../../utils/routesFormat";
import Swal from "sweetalert2";

export default function CreateAuthor() {
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState("");
  const [authorLastname, setAuthorLastname] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch(authorAPI, {
      method: "POST",
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
          title: "Autor agregado",
          text: "Autor agregado correctamente.",
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
        <form onSubmit={handleSubmit} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Agregar autor</h3>
          </div>
          <div className="form-body p-3 border-bottom">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
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
                required
                onChange={(e) => {
                  setAuthorLastname(e.target.value);
                }}
              />
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
}
