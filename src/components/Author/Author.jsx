import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {authorAPI} from "../../utils/routesFormat";
import Swal from "sweetalert2";
import Toolbar from "../Toolbar/Toolbar";
import Error from "../../utils/Error";
import InfoNotFound from "../../utils/InfoNotFound";

export default function Author() {
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState([]);

  function getAuthors() {
    fetch(authorAPI)
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => setError(error.message));
  }

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <>
      <Toolbar toPath={"/author/create"} />
      <div className="row">
        {error && <Error message={error} />}
        {authors && <InfoNotFound />}
        {authors?.map((item) => (
          <div className="col-md-3 mb-4" key={item.author_id}>
            <div className="card">
              <img src="/author.jpg" className="card-img-top" alt={item.author_name} />
              <div className="card-body">
                <h5 className="card-title">#{item.author_id}</h5>
                <p className="card-text">
                  {item.author_name} {item.author_lastname}
                </p>
                <Link to={`/author/update/${item.author_id}`} className="btn btn-warning">
                  <i className="fa-solid fa-edit"></i>
                </Link>
                &nbsp;
                <button className="btn btn-danger" onClick={() => deleteAuthor(item.author_id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  function deleteAuthor(author_id) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este autor?",
      text: `Estás a punto de eliminar el autor con el identificador #${author_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#20515C",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(authorAPI + `/${author_id}`, {method: "DELETE"})
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error.message))
          .finally(() => {
            Swal.fire({
              icon: "success",
              title: "Autor eliminado",
              text: "Autor eliminado correctamente.",
              showConfirmButton: false,
              timer: 2000,
            });
            getAuthors();
          });
      }
    });
  }
}
