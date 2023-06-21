import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import Error from '../../utils/Error';
import InfoNotFound from '../../utils/InfoNotFound';
import { editorialAPI } from '../../utils/routesFormat';

export default function Editorial() {
  const [error, setError] = useState(null);
  const [editorials, setEditorials] = useState([]);

  async function getEditorials() {
    await axios
      .get(editorialAPI)
      .then(({ data }) => setEditorials(data))
      .catch(({ message }) => setError(message));
  }

  useEffect(() => {
    getEditorials();
  }, []);

  return (
    <>
      <Toolbar toPath={'/editorial/create'} />
      {error && <Error message={error} />}
      {editorials.length === 0 && <InfoNotFound />}
      <div className="row">
        {editorials?.map((item) => (
          <div className="col-md-3 mb-4" key={item.editorial_id}>
            <div className="card">
              <img
                src="/editorial.jpg"
                className="card-img-top"
                alt={item.editorial_name}
              />
              <div className="card-body">
                <h5 className="card-title">
                  #{item.editorial_id} - {item.editorial_name}
                </h5>
                <p className="card-text">
                  <small>{item.editorial_description}</small>
                </p>
                <Link
                  to={`/editorial/update/${item.editorial_id}`}
                  className="btn btn-warning"
                >
                  <i className="fa-solid fa-edit"></i>
                </Link>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEditorial(item.editorial_id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  async function deleteEditorial(editorial_id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este editorial?',
      text: `Estás a punto de eliminar el editorial con el identificador #${editorial_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#dc3545',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(editorialAPI + `/${editorial_id}`)
          .then(({ data, statusText }) => {
            console.log(statusText);
            console.log(data);
            Swal.fire({
              icon: 'success',
              title: `Editorial #${editorial_id} eliminado`,
              text: `Editorial eliminado correctamente.`,
              showConfirmButton: false,
              timer: 2000,
            });
            getEditorials();
          });
      }
    });
  }
}
