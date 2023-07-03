import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import Error from '../../utils/Error';
import InfoNotFound from '../../utils/InfoNotFound';
import { authorAPI } from '../../utils/routesFormat';

export default function Author() {
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAuthors();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    getAuthors();
  }, []);

  async function getAuthors() {
    await axios
      .get(authorAPI + `?query_string=${searchTerm}`)
      .then(({ data }) => setAuthors(data))
      .catch(({ message }) => setError(message));
  }

  return (
    <>
      <Toolbar
        showBtn={true}
        toPath={'/author/create'}
        searchTerm={searchTerm}
        setSearchTerm={(i) => setSearchTerm(i)}
        placeholder={'Consultar autor por nombre'}
      />
      {error && <Error message={error} />}
      {authors.length === 0 && <InfoNotFound />}
      <div className="row">
        {authors?.map((item) => (
          <div className="col-md-3 mb-4" key={item.author_id}>
            <div className="card">
              <img src="/author.jpg" className="card-img-top" alt={item.author_name} />
              <div className="card-body">
                <h5 className="card-title">#{item.author_id}</h5>
                <p className="card-text">
                  <small>
                    {item.author_name} {item.author_lastname}
                  </small>
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

  async function deleteAuthor(author_id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este autor?',
      text: `Estás a punto de eliminar el autor con el identificador #${author_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#dc3545',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(authorAPI + `/${author_id}`).then(({ data, statusText }) => {
          console.log(statusText);
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: `Autor #${author_id} eliminado`,
            text: `Autor eliminado correctamente.`,
            showConfirmButton: false,
            timer: 2000,
          });
          getAuthors();
        });
      }
    });
  }
}
