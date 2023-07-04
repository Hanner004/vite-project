import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolbarReservation from '../Toolbar/Toolbar-Reservation';
import Error from '../../utils/Error';
import InfoNotFound from '../../utils/InfoNotFound';
import { reservationAPI } from '../../utils/routesFormat';
import { ReservationStatusEnum } from '../../utils/enums/reservation.enum';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

export default function Reservation() {
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getReservations();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, status]);

  useEffect(() => {
    getReservations();
  }, []);

  async function getReservations() {
    let params = {};
    if (status !== null) {
      params = {
        status,
      };
    }
    await axios
      .get(reservationAPI + `?query_string=${searchTerm}`, { params })
      .then(({ data }) => setReservations(data))
      .catch(({ message }) => setError(message));
  }

  return (
    <>
      <ToolbarReservation
        toPath={'/reservation/create'}
        searchTerm={searchTerm}
        setSearchTerm={(i) => setSearchTerm(i)}
        placeholder={'Consultar reservaciones'}
        setStatus={setStatus}
      />
      <div className="table-responsive mb-2">
        <table className="table table-sm">
          <thead className="table-dark">
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">DNI</th>
              <th scope="col">Correo</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {reservations?.map((item) => (
              <tr key={item.reservation_id} className="align-middle text-center">
                <th scope="row">{item.reservation_id}</th>
                <td>{item.client_name + ' ' + item.client_lastname}</td>
                <td>{item.client_dni}</td>
                <td>{item.client_email}</td>
                <td>{item.client_phone}</td>
                <td>
                  <div className={textColorByStatus(item.reservation_status)}>{item.reservation_status}</div>
                </td>
                <td>
                  {formatDateByStatus(
                    item.reservation_status,
                    item.reservation_created_at,
                    item.reservation_finalized_at,
                    item.reservation_deleted_at,
                  )}
                </td>
                <td>
                  <button
                    disabled={item.reservation_status !== ReservationStatusEnum.ACTIVE}
                    className="btn btn-secondary"
                    onClick={() => finalizeReservation(item.reservation_id)}
                  >
                    <i className="fa-solid fa-check-to-slot"></i>
                  </button>
                </td>
                <td>
                  <button
                    disabled={item.reservation_status !== ReservationStatusEnum.ACTIVE}
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

  async function finalizeReservation(reservation_id) {
    Swal.fire({
      title: '¿Estás seguro de finalizar esta reservación?',
      text: `Estás a punto de finalizar la reservación con el identificador #${reservation_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'Green',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(reservationAPI + `/finalize/${reservation_id}`).then(({ data, statusText }) => {
          console.log(statusText);
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: `Reservación #${reservation_id} finalizada`,
            text: `Reservación finalizada correctamente.`,
            showConfirmButton: false,
            timer: 2000,
          });
          getReservations();
        });
      }
    });
  }

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

  function formatDateByStatus(
    status,
    reservation_created_at,
    reservation_finalized_at,
    reservation_deleted_at,
  ) {
    switch (status) {
      case ReservationStatusEnum.ACTIVE:
        return `Activo desde: ${dayjs(reservation_created_at)
          .subtract(5, 'hours')
          // .format('dddd, DD/MMMM/YYYY, h:mm:ss A')
          .format('DD/MMMM/YYYY, h:mm:ss A')
          .toUpperCase()}`;
      case ReservationStatusEnum.FINALIZED:
        return `Finalizado desde: ${dayjs(reservation_finalized_at)
          // .subtract(5, 'hours')
          // .format('dddd, DD/MMMM/YYYY, h:mm:ss A')
          .format('DD/MMMM/YYYY, h:mm:ss A')
          .toUpperCase()}`;
      case ReservationStatusEnum.DELETED:
        return `Eliminado desde: ${dayjs(reservation_deleted_at)
          // .subtract(5, 'hours')
          // .format('dddd, DD/MMMM/YYYY, h:mm:ss A')
          .format('DD/MMMM/YYYY, h:mm:ss A')
          .toUpperCase()}`;
    }
  }

  function textColorByStatus(status) {
    switch (status) {
      case ReservationStatusEnum.ACTIVE:
        return `text-white rounded bg-success p-1`;
      case ReservationStatusEnum.FINALIZED:
        return `text-white rounded bg-secondary p-1`;
      case ReservationStatusEnum.DELETED:
        return `text-white rounded bg-danger p-1`;
    }
  }
}
