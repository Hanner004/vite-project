import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clientAPI } from '../../utils/routesFormat';

export default function UpdateClient() {
  const navigate = useNavigate();

  const { clientId } = useParams();
  const [clientDNI, setClientDNI] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientLastname, setClientLastname] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  async function getClientById() {
    await axios
      .get(clientAPI + `/${clientId}`)
      .then(({ data }) => {
        setClientDNI(data.client_dni);
        setClientName(data.client_name);
        setClientLastname(data.client_lastname);
        setClientEmail(data.client_email);
        setClientPhone(data.client_phone);
      })
      .catch(({ message }) => console.log(message));
  }

  useEffect(() => {
    getClientById();
  }, []);

  async function handleUpdate(event) {
    event.preventDefault();
    await axios
      .put(clientAPI + `/${clientId}`, {
        dni: clientDNI,
        name: clientName,
        lastname: clientLastname,
        email: clientEmail.toLowerCase().trim(),
        phone: clientPhone,
      })
      .then(({ data, statusText }) => {
        console.log(statusText);
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: `Cliente editado`,
          text: 'Cliente actualizado correctamente.',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/client');
      })
      .catch(({ response }) => {
        const { data, status } = response;
        console.log(response.status);
        console.log(data.message);
        if (status === 400) {
          if (data.message[0] === 'phone must be a valid phone number') {
            return Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'El número de teléfono no es válido',
              confirmButtonColor: 'Gray',
            });
          }
        }
        if (status === 409) {
          if (data.message === 'the client dni is registered') {
            return Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'El DNI del cliente se encuentra registrado en el sistema',
              confirmButtonColor: 'Gray',
            });
          }
          if (data.message === 'the client email is registered') {
            return Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'El correo del cliente se encuentra registrado en el sistema',
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
    navigate('/client');
  }

  return (
    <div className="row">
      <div className="col mb-4">
        <form onSubmit={handleUpdate} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Actualizar cliente</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input type="number" className="form-control" value={clientId} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">DNI del cliente</label>
              <input
                type="text"
                className="form-control"
                placeholder="DNI"
                value={clientDNI}
                required
                onChange={(e) => {
                  setClientDNI(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre del cliente</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={clientName}
                required
                onChange={(e) => {
                  setClientName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido del cliente</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                value={clientLastname}
                required
                onChange={(e) => {
                  setClientLastname(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo del cliente</label>
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                value={clientEmail}
                required
                onChange={(e) => {
                  setClientEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono del cliente</label>
              <input
                type="text"
                className="form-control"
                placeholder="Teléfono"
                value={clientPhone}
                required
                onChange={(e) => {
                  setClientPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-footer p-3">
            <button type="submit" className="btn btn-outline-primary mr-2">
              Actualizar cliente
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
