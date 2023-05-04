import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {editorialAPI} from "../../utils/routesFormat";
import Swal from "sweetalert2";

export default function CreateEditorial() {
  const navigate = useNavigate();
  const [editorialName, setEditorialName] = useState("");
  const [editorialDescription, setEditorialDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch(editorialAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editorialName,
        description: editorialDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message))
      .finally(() => {
        Swal.fire({
          icon: "success",
          title: "Editorial agregado",
          text: "Editorial agregado correctamente.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/editorial");
      });
  }

  const handleCancel = () => {
    navigate("/editorial");
  };

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleSubmit} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Agregar editorial</h3>
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
                  setEditorialName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                placeholder="Descripción"
                required
                onChange={(e) => {
                  setEditorialDescription(e.target.value);
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
