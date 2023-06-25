import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import Error from '../../utils/Error';
import InfoNotFound from '../../utils/InfoNotFound';
import { clientAPI } from '../../utils/routesFormat';

export default function Client() {
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getClients();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    getClients();
  }, []);

  async function getClients() {
    await axios
      .get(clientAPI + `?query_string=${searchTerm}`)
      .then(({ data }) => setClients(data))
      .catch(({ message }) => setError(message));
  }

  return (
    <>
      <Toolbar
        showBtn={true}
        toPath={'/client/create'}
        searchTerm={searchTerm}
        setSearchTerm={(i) => setSearchTerm(i)}
        placeholder={'Consultar cliente'}
      />
      <div className="table-responsive mb-2">
        <table className="table table-sm table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">DNI</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Correo</th>
              <th scope="col">Teléfono</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((item) => (
              <tr key={item.client_id} className="align-middle">
                <th scope="row">{item.client_id}</th>
                <td>{item.client_dni}</td>
                <td>{item.client_name}</td>
                <td>{item.client_lastname}</td>
                <td>{item.client_email}</td>
                <td>{item.client_phone}</td>
                <td>
                  <Link to={`/client/update/${item.client_id}`} className="btn btn-warning">
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteClient(item.client_id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <Error message={error} />}
      {clients.length === 0 && <InfoNotFound />}
    </>
  );

  async function deleteClient(client_id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este cliente?',
      text: `Estás a punto de eliminar el cliente con el identificador #${client_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#dc3545',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(clientAPI + `/${client_id}`).then(({ data, statusText }) => {
          console.log(statusText);
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: `Cliente #${client_id} eliminado`,
            text: `Cliente eliminado correctamente.`,
            showConfirmButton: false,
            timer: 2000,
          });
          getClients();
        });
      }
    });
  }
}
