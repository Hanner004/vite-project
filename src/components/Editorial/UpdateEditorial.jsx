import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editorialAPI } from '../../utils/routesFormat';

export default function UpdateEditorial() {
  const navigate = useNavigate();

  const { editorialId } = useParams();
  const [editorialName, setEditorialName] = useState('');
  const [editorialDescription, setEditorialDescription] = useState('');

  async function getEditorialById() {
    await axios
      .get(editorialAPI + `/${editorialId}`)
      .then(({ data }) => {
        setEditorialName(data.editorial_name);
        setEditorialDescription(data.editorial_description);
      })
      .catch(({ message }) => console.log(message));
  }

  useEffect(() => {
    getEditorialById();
  }, []);

  async function handleUpdate(event) {
    event.preventDefault();
    await axios
      .put(editorialAPI + `/${editorialId}`, {
        name: editorialName,
        description: editorialDescription,
      })
      .then(({ data, statusText }) => {
        console.log(statusText);
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: `Editorial #${editorialId} editado`,
          text: 'Editorial actualizado correctamente.',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/editorial');
      })
      .catch(({ response }) => {
        const { data, status } = response;
        console.log(response.status);
        console.log(data.message);
        if (status === 409) {
          if (data.message === 'the editorial name is registered') {
            return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El nombre de la editorial se encuentra registrado en el sistema',
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
    navigate('/editorial');
  }

  return (
    <div className="row">
      <div className="col mb-4">
        <form onSubmit={handleUpdate} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Actualizar editorial #{`${editorialId}`}</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Nombre de la editorial</label>
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
              <label className="form-label">Descripción de la editorial</label>
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
              Actualizar editorial
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
