import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorAPI } from '../../utils/routesFormat';

export default function CreateAuthor() {
  const navigate = useNavigate();

  const [authorName, setAuthorName] = useState('');
  const [authorLastname, setAuthorLastname] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post(authorAPI, {
        name: authorName,
        lastname: authorLastname,
      })
      .then(({ data, statusText }) => {
        console.log(statusText);
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: `Autor agregado`,
          text: `Autor agregado correctamente.`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/author');
      })
      .catch(({ response }) => {
        const { data, status } = response;
        console.log(response.status);
        console.log(data.message);
        if (status === 409) {
          if (data.message === 'the author name is registered') {
            return Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'El nombre del autor se encuentra registrado en el sistema',
              confirmButtonColor: 'Gray',
            });
          }
        }
        return Swal.fire({
          icon: 'error',
          title: response.statusText,
          text: data.message[0],
          confirmButtonColor: 'Gray',
        });
      });
  }

  async function handleCancel() {
    navigate('/author');
  }

  return (
    <div className="row">
      <div className="col mb-4">
        <form onSubmit={handleSubmit} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Agregar autor</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Nombre del autor</label>
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
              <label className="form-label">Apellido del autor</label>
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
            <button type="submit" className="btn btn-outline-primary mr-2">
              Agregar autor
            </button>
            &nbsp;
            <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
