import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import Error from '../../utils/Error';
import InfoNotFound from '../../utils/InfoNotFound';
import { booksAPI } from '../../utils/routesFormat';

export default function Book() {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getBooks();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    await axios
      .get(booksAPI + `?query_string=${searchTerm}`)
      .then(({ data }) => setBooks(data))
      .catch(({ message }) => setError(message));
  }

  function circleBookClass(value) {
    if (value > 0) {
      return <span className="circle-book available-book" />;
    } else {
      return <span className="circle-book not-available-book" />;
    }
  }

  return (
    <>
      <Toolbar
        showBtn={true}
        toPath={'/book/create'}
        searchTerm={searchTerm}
        setSearchTerm={(i) => setSearchTerm(i)}
        placeholder={'Consultar libro por nombre, autor o editorial'}
      />
      {error && <Error message={error} />}
      {books.length === 0 && <InfoNotFound />}
      <div className="row">
        {books?.map((item) => (
          <div className="col-md-3 mb-4" key={item.book_id}>
            <div className="card">
              <img src="/book.jpg" className="card-img-top" alt={item.book_name} />
              <div className="card-body">
                <h5 className="card-title">
                  #{item.book_id} {circleBookClass(item.book_available_quantity - item.book_current_amount_occupied)} - {item.book_name}
                </h5>
                <p className="card-text">
                  <small>
                    Cantidad MAX: {item.book_available_quantity}
                    <br />
                    Cantidad disponible:&nbsp;
                    {item.book_available_quantity - item.book_current_amount_occupied}
                    <br />
                    Ubicación: {item.book_library_location}
                    <br />
                    ISBN: {item.book_isbn_code}
                    <br />
                    Editorial: {item.editorial_name}
                    <br />
                    Autor: {item.author_name} {item.author_lastname}
                  </small>
                </p>
                <Link to={`/book/update/${item.book_id}`} className="btn btn-warning">
                  <i className="fa-solid fa-edit"></i>
                </Link>
                &nbsp;
                <button className="btn btn-danger" onClick={() => deleteBook(item.book_id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  async function deleteBook(book_id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este libro?',
      text: `Estás a punto de eliminar el libro con el identificador #${book_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#dc3545',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(booksAPI + `/${book_id}`).then(({ data, statusText }) => {
          console.log(statusText);
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: `Libro #${book_id} eliminado`,
            text: `Libro eliminado correctamente.`,
            showConfirmButton: false,
            timer: 2000,
          });
          getBooks();
        });
      }
    });
  }
}
