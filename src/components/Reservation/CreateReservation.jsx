import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientAPI, booksAPI } from '../../utils/routesFormat';
import ClientDropdown from '../Dropdown/ClientDropdown';
import BookDropdown from '../Dropdown/BookDropdown';

export default function CreateReservation() {
  const navigate = useNavigate();
  //select-control
  const [selectValue, setSelectValue] = useState();
  // state
  const [clients, setClients] = useState([]);
  const [books, setBooks] = useState([]);
  //select-option
  const [clientOption, setClientOption] = useState({});
  const [bookOption, setBookOption] = useState({});

  async function getClients() {
    await axios
      .get(clientAPI)
      .then(({ data }) => setClients(data))
      .catch(({ message }) => console.log(message));
  }

  console.log(books);

  async function getBooks() {
    await axios
      .get(booksAPI)
      .then(({ data }) => setBooks(data))
      .catch(({ message }) => console.log(message));
  }

  useEffect(() => {
    getClients();
    getBooks();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
  }

  const [quantity, setQuantity] = useState(null);
  const [elementsToSave, setElementsToSave] = useState([]);

  async function addElement(e) {
    e.preventDefault();
    if (bookOption) {
      if (bookOption.book_id) {
        const newElement = { bookId: bookOption.book_id, quantity };
        setElementsToSave([...elementsToSave, newElement]);
        setQuantity(null);
        const list = books.filter((obj) => obj.book_id !== bookOption.book_id);
        setBooks(list);
        setBookOption(null);
        setSelectValue(null);
      }
    }
  }

  async function handleCancel() {
    navigate('/reservation');
  }

  return (
    <>
      <div className="row">
        <div className="col mb-4">
          <form onSubmit={handleSubmit} className="border rounded">
            <div className="form-title p-3 border-bottom">
              <h3 className="m-0">Agregar nueva reserva</h3>
            </div>
            <div className="form-body border-bottom p-3">
              <div className="mb-3">
                <ClientDropdown
                  clients={clients}
                  clientOptionClick={(option) => clientOptionClick(option)}
                />
              </div>
              <div className="mb-3">
                {/* start */}
                <div className="row">
                  <label className="form-label">Libro disponible</label>
                  <div className="col">
                    <BookDropdown
                      books={books}
                      bookOptionClick={(option) => bookOptionClick(option)}
                      selectValue={selectValue}
                    />
                  </div>
                  <div className="col-auto">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      pattern="[0-9]*"
                      className="form-control"
                      placeholder="Cantidad"
                      required
                      value={quantity || ''}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      disabled={quantity < 1}
                      className="btn btn-primary"
                      onClick={addElement}
                    >
                      <i className="fa-solid fa-circle-plus"></i>
                    </button>
                  </div>
                </div>
                {/* end */}
              </div>
            </div>
            <div className="form-footer p-3">
              <button
                type="submit"
                className="btn btn-primary mr-2"
                disabled={elementsToSave.length === 0}
              >
                Agregar
              </button>
              &nbsp;
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row border pb-4">
        <div className="col-md-12">
          <h3>Elementos Agregados:</h3>
          {elementsToSave.length === 0 ? (
            <p>No se han agregado elementos</p>
          ) : (
            <ul>
              {elementsToSave.map((element, index) => (
                <li key={index}>
                  {element.bookId} - {element.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );

  async function clientOptionClick(option) {
    setClientOption(option.value);
  }

  async function bookOptionClick(option) {
    setBookOption(option.value);
  }
}
