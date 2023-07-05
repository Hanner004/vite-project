import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { booksAPI, reservationAPI } from '../../utils/routesFormat';
import Error from '../../utils/Error';
import InfoNotFound from '../../utils/InfoNotFound';
import Toolbar from '../Toolbar/Toolbar';
import ReservComponent from './ReservComponent';

export default function ReservationBook() {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [reservBooks, setReservBooks] = useState([]);
  const [reservInfo, setReservInfo] = useState({});

  async function getBooksByReservById(reservation_id) {
    await axios
      .get(booksAPI + `/by-reservation/${reservation_id}?query_string=${searchTerm}`)
      .then(({ data }) => setReservBooks(data))
      .catch(({ message }) => setError(message));
  }

  async function getReservInfo(reservation_id) {
    await axios
      .get(reservationAPI + `/${reservation_id}`)
      .then(({ data }) => setReservInfo(data))
      .catch(({ message }) => setError(message));
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getBooksByReservById(reservationId);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    getBooksByReservById(reservationId);
    getReservInfo(reservationId);
  }, []);

  return (
    <>
      <Toolbar
        showBtn={false}
        searchTerm={searchTerm}
        setSearchTerm={(i) => setSearchTerm(i)}
        placeholder={`Consultar libro por nombre, autor o editorial de la reserva #${reservationId}`}
      />
      <ReservComponent reserv={reservInfo} />
      <div className="table-responsive mb-2">
        <table className="table table-sm">
          <thead className="table-dark">
            <tr className="text-center">
              <th colSpan={7} className="p-3">
                Libros asignados a la reservación
              </th>
            </tr>
          </thead>
          <thead className="table-dark">
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Nombre del libro</th>
              <th scope="col">Cantidad solicitada</th>
              <th scope="col">ISBN</th>
              <th scope="col">Autor del libro</th>
              <th scope="col">Editorial del libro</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {reservBooks?.map((item, index) => (
              <tr key={index + 1} className="align-middle text-center">
                <th scope="row">{index + 1}</th>
                <td>{item.book_name}</td>
                <td>{item.reservationBook_quantity}</td>
                <td>{item.book_isbn_code}</td>
                <td>{item.author_name + ' ' + item.author_lastname}</td>
                <td>{item.editorial_name}</td>
                <td>
                  <button className="btn btn-outline-light" disabled>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <Error message={error} />}
      {reservBooks.length === 0 && <InfoNotFound />}
    </>
  );
}
