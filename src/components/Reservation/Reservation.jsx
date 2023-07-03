import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import Error from '../../utils/Error';
import InfoNotFound from '../../utils/InfoNotFound';
import { reservationAPI } from '../../utils/routesFormat';

export default function Reservation() {
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getReservations();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    getReservations();
  }, []);

  async function getReservations() {
    await axios
      // .get(reservationAPI + `?query_string=${searchTerm}`)
      .get(reservationAPI)
      .then(({ data }) => setReservations(data))
      .catch(({ message }) => setError(message));
  }

  function getStatus(boolean) {
    if (boolean) {
      return 'Ocupado';
    } else {
      return 'Disponible';
    }
  }

  return (
    <>
      <Toolbar
        showBtn={true}
        toPath={'/reservation/create'}
        searchTerm={searchTerm}
        setSearchTerm={(i) => setSearchTerm(i)}
        placeholder={'Consultar reservaciones'}
      />
      <div className="table-responsive mb-2">
        <table className="table table-sm table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Estado</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {reservations?.map((item) => (
              <tr key={item.reservation_id} className="align-middle">
                <th scope="row">{item.reservation_id}</th>
                <td>{getStatus(item.reservation_is_busy)}</td>
                <td>
                  <Link
                    to={`/reservation/update/${item.reservation_id}`}
                    className="btn btn-warning"
                  >
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteReservation(item.reservation_id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <Error message={error} />}
      {reservations.length === 0 && <InfoNotFound />}
    </>
  );

  async function deleteReservation(reservation_id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta reservación?',
      text: `Estás a punto de eliminar la reservación con el identificador #${reservation_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#dc3545',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(reservationAPI + `/${reservation_id}`).then(({ data, statusText }) => {
          console.log(statusText);
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: `Reservación #${reservation_id} eliminada`,
            text: `Reservación eliminada correctamente.`,
            showConfirmButton: false,
            timer: 2000,
          });
          getReservations();
        });
      }
    });
  }
}
