import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import Error from "../../utils/Error";
import Modal from "../Modal/Modal";
import {IEditorial} from "../../interfaces";

export default function Editorial() {
  //api
  let url = `http://localhost:4444/api/v1/book-reserve/editorials`;
  const [error, setError] = useState(null);
  const [editorials, setEditorials] = useState<IEditorial[]>([]);
  const [editorialId, setEditorialId] = useState(Number);
  const [editorialName, setEditorialName] = useState("");
  const [editorialDescription, setEditorialDescription] = useState("");

  useEffect(() => {
    getEditorials();
  }, []);

  function getEditorials() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setEditorials(data))
      .catch((error) => setError(error.message));
  }

  function addEditorial(e: any) {
    e.preventDefault();
    fetch(url, {
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
      .catch((error) => setError(error.message))
      .finally(() => {
        Swal.fire({
          icon: "success",
          title: "Editorial agregado",
          text: "Editorial agregado correctamente.",
          showConfirmButton: false,
          timer: 2000,
        });
        getEditorials();
      });
  }

  function updateEditorial(e: any) {
    e.preventDefault();
    fetch(`${url}/${editorialId}`, {
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
      .catch((error) => setError(error.message))
      .finally(() => {
        Swal.fire({
          icon: "success",
          title: "Editorial editado",
          text: "Editorial actualizado correctamente.",
          showConfirmButton: false,
          timer: 2000,
        });
        getEditorials();
      });
  }

  function deleteEditorial(editorialId: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este editorial?",
      text: `Estás a punto de eliminar el editorial con el identificador #${editorialId}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#20515C",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${url}/${editorialId}`, {method: "DELETE"})
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => setError(error.message))
          .finally(() => {
            Swal.fire({
              icon: "success",
              title: "Editorial eliminado",
              text: "Editorial eliminado correctamente.",
              showConfirmButton: false,
              timer: 2000,
            });
            getEditorials();
          });
      }
    });
  }

  return (
    <>
      {/* start-toolbar */}
      <div className="row">
        <div className="col-12 mb-4 text-center">
          <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#add-editorial">
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </button>
        </div>
      </div>
      {/* end-toolbar */}
      {/* start-content */}
      <div className="row">
        {error && <Error message={error} />}
        {editorials?.map((item) => (
          <div className="col-md-4 mb-4" key={item.editorial_id}>
            <div className="card">
              <img src="/editorial.jpg" className="card-img-top" alt={item.editorial_name} />
              <div className="card-body">
                <h5 className="card-title">
                  {item.editorial_id} - {item.editorial_name}
                </h5>
                <p className="card-text">{item.editorial_description}</p>
                <button
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#update-editorial"
                  onClick={() => {
                    setEditorialId(item.editorial_id);
                    setEditorialName(item.editorial_name);
                    setEditorialDescription(item.editorial_description);
                  }}
                >
                  <i className="fa-solid fa-edit"></i>
                </button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => deleteEditorial(item.editorial_id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* end-content */}
      {/* start-modal */}
      <Modal
        id="add-editorial"
        title="Agregar editorial"
        textbtn="Agregar"
        submit={addEditorial}
        body={
          <>
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
          </>
        }
      />
      {/* end-modal */}
      {/* start-modal */}
      <Modal
        id="update-editorial"
        title="Actualizar editorial"
        textbtn="Actualizar"
        submit={updateEditorial}
        body={
          <>
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
          </>
        }
      />
      {/* end-modal */}
    </>
  );
}
