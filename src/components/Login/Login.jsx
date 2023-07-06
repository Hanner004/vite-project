import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../utils/routesFormat';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = `${authAPI}/login`;

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post(login, {
        email: email.toLowerCase().trim(),
        password,
      })
      .then(({ data, statusText }) => {
        console.log(statusText);
        console.log(data);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('role', data.role);
        // window.location.href = "/";
        return Swal.fire({
          icon: 'success',
          title: `Inicio de sesión exitoso`,
          text: `Se ha conectado con éxito.`,
          showConfirmButton: false,
          timer: 2000,
        }).then(function () {
          window.location.href = '/';
        });
      })
      .catch(({ response }) => {
        const { data, status } = response;
        console.log(response.status);
        console.log(data.message);
        if (status === 400) {
          if (data.message === 'email or password invalid') {
            return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Correo o contraseña incorrecta',
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
    navigate('/');
  }

  return (
    <div className="row">
      <div className="col mb-4">
        <form onSubmit={handleSubmit} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Iniciar sesión</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-footer p-3">
            <button type="submit" className="btn btn-outline-primary mr-2">
              Iniciar
            </button>
            &nbsp;
            <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
