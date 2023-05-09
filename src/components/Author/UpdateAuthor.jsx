import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authorAPI } from '../../utils/routesFormat';

export default function UpdateAuthor() {
  const navigate = useNavigate();
  const { authorId } = useParams();

  const [authorName, setAuthorName] = useState('');
  const [authorLastname, setAuthorLastname] = useState('');

  async function getAuthorById() {
    await axios
      .get(authorAPI + `/${authorId}`)
      .then(({ data }) => {
        setAuthorName(data.author_name);
        setAuthorLastname(data.author_lastname);
      })
      .catch(({ message }) => console.log(message));
  }

  useEffect(() => {
    getAuthorById();
  }, []);

  async function handleUpdate(event) {
    event.preventDefault();
    await axios
      .put(authorAPI + `/${authorId}`, {
        name: authorName,
        lastname: authorLastname,
      })
      .then(({ data, statusText }) => {
        console.log(statusText);
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: `Autor #${authorId} editado`,
          text: 'Autor actualizado correctamente.',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/author');
      })
      .catch(({ response }) => {
        const { data } = response;
        Swal.fire({
          icon: 'error',
          title: response.statusText,
          text: data.message[0],
        });
      });
  }

  async function handleCancel() {
    navigate('/author');
  }

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleUpdate} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Actualizar autor #{`${authorId}`}</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Nombre del autor</label>
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
              <label className="form-label">Apellido del autor</label>
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
              Actualizar autor
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
