import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Error from '../../utils/Error';
import InfoNotFound from '../../utils/InfoNotFound';
import { booksAPI } from '../../utils/routesFormat';

export default function HomeBook() {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchAPI();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    searchAPI();
  }, []);

  const searchAPI = async () => {
    await axios
      .get(booksAPI + `?query_string=${searchTerm}`)
      .then(({ data }) => setBooks(data))
      .catch(({ message }) => setError(message));
  };

  return (
    <>
      <div className="row">
        <div className="col-12 mb-4">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Consultar libro por nombre, autor o editorial"
          />
        </div>
      </div>
      <div className="row">
        {error && <Error message={error} />}
        {books.length === 0 && <InfoNotFound />}
        {books?.map((item) => (
          <div className="col-md-3 mb-4" key={item.book_id}>
            <div className="card">
              <img
                src="/book.jpg"
                className="card-img-top"
                alt={item.book_name}
              />
              <div className="card-body">
                <h5 className="card-title">
                  #{item.book_id} - {item.book_name}
                </h5>
                <p className="card-text">
                  <small>
                    Cantidad MAX establecida: {item.book_available_quantity}
                    <br />
                    Cantidad disponible:{' '}
                    {item.book_available_quantity -
                      item.book_current_amount_occupied}
                    <br />
                    Ubicación: {item.book_library_location}
                    <br />
                    Editorial: {item.editorial_name}
                    <br />
                    Autor: {item.author_name} {item.author_lastname}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
