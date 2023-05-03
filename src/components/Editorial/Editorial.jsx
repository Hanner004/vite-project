import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {editorialAPI} from "../../utils/routesFormat";
import Swal from "sweetalert2";
import Toolbar from "../Toolbar/Toolbar";
import Error from "../../utils/Error";

export default function Editorial() {
  const [error, setError] = useState(null);
  const [editorials, setEditorials] = useState([]);

  function getEditorials() {
    fetch(editorialAPI)
      .then((response) => response.json())
      .then((data) => setEditorials(data))
      .catch((error) => setError(error.message));
  }

  useEffect(() => {
    getEditorials();
  }, []);

  return (
    <>
      <Toolbar toPath={"/editorial/create"} />
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
                <Link to={`/editorial/update/${item.editorial_id}`} className="btn btn-warning">
                  <i className="fa-solid fa-edit"></i>
                </Link>
                &nbsp;
                <button className="btn btn-danger" onClick={() => deleteEditorial(item.editorial_id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  function deleteEditorial(editorial_id) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este editorial?",
      text: `Estás a punto de eliminar el editorial con el identificador #${editorial_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#20515C",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(editorialAPI + `/${editorial_id}`, {method: "DELETE"})
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error.message))
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
}
