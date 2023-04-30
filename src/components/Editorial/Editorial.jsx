import React, {useState} from "react";
import Swal from "sweetalert2";

import Error from "../../utils/Error";
import Loading from "../../utils/Loading";
import {useFetch} from "../../utils/useFetch";
import Modal from "../Modal/Modal";

export default function Editorial() {
  let url = `http://localhost:4444/api/v1/book-reserve/editorials`;
  const {data, loading, error} = useFetch(url);

  const [editorialId, setEditorialId] = useState(null);
  const [editorialName, setEditorialName] = useState("");
  const [editorialDescription, setEditorialDescription] = useState("");

  function addEditorial(e) {
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
      .catch((error) => console.log(error.message))
      .finally(() =>
        Swal.fire({
          icon: "success",
          title: "Editorial agregado",
          text: `${editorialName}`,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  }

  return (
    <>
      {/* start-toolbar */}
      <div className="row">
        <div className="col-12 mb-4 text-center">
          <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addEditorial">
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </button>
        </div>
      </div>
      {/* end-toolbar */}
      {/* start-content */}
      <div className="row">
        {error && <Error message={error} />}
        {loading && <Loading />}
        {data?.map((result, index) => (
          <div className="col-md-4 mb-4" key={result.editorial_id}>
            <div className="card">
              {/* <img src={result.image} className="card-img-top" alt={result.editorial_name} /> */}
              <div className="card-body">
                <h5 className="card-title">{result.editorial_name}</h5>
                <p className="card-text">{result.editorial_description}</p>
                <button className="btn btn-warning">
                  <i className="fa-solid fa-edit"></i>
                </button>
                &nbsp;
                <button className="btn btn-danger">
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
        id="addEditorial"
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
    </>
  );
}
