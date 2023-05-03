import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {editorialAPI} from "../../utils/routesFormat";

export default function UpdateEditorial() {
  const navigate = useNavigate();
  const {editorialId} = useParams();

  const [editorialName, setEditorialName] = useState("");
  const [editorialDescription, setEditorialDescription] = useState("");

  useEffect(() => {
    //find by id
    fetch(editorialAPI + `/${editorialId}`)
      .then((response) => response.json())
      .then((data) => {
        setEditorialName(data.editorial_name);
        setEditorialDescription(data.editorial_description);
      })
      .catch((error) => console.log(error.message));
  }, []);

  function handleUpdate(event) {
    event.preventDefault();
    fetch(editorialAPI + `/${editorialId}`, {
      method: "PUT",
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
          title: "Editorial editado",
          text: "Editorial actualizado correctamente.",
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
        <form onSubmit={handleUpdate} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Actualizar editorial #{`${editorialId}`}</h3>
          </div>
          <div className="form-body p-3 border-bottom">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={editorialName}
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
                value={editorialDescription}
                required
                onChange={(e) => {
                  setEditorialDescription(e.target.value);
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
