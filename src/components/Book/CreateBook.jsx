import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { authorAPI, booksAPI, editorialAPI } from '../../utils/routesFormat';
import EditorialDropdown from '../Dropdown/EditorialDropdown';
import AuthorDropdown from '../Dropdown/AuthorDropdown';

export default function CreateBook() {
  //dropdown-data
  const [editorials, setEditorials] = useState([]);
  const [authors, setAuthors] = useState([]);

  async function getEditorials() {
    await axios
      .get(editorialAPI)
      .then(({ data }) => setEditorials(data))
      .catch(({ message }) => console.log(message));
  }

  async function getAuthors() {
    await axios
      .get(authorAPI)
      .then(({ data }) => setAuthors(data))
      .catch(({ message }) => console.log(message));
  }
  useEffect(() => {
    getEditorials();
    getAuthors();
  }, []);

  const [editorialOption, setEditorialOption] = useState({});
  const [authorOption, setAuthorOption] = useState({});
  const navigate = useNavigate();
  //book-state
  const [bookName, setBookName] = useState('');
  const [bookAvailableQuantity, setBookAvailableQuantity] = useState(null);
  const [bookLibraryLocation, setBookLibraryLocation] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!authorOption.author_id || !editorialOption.editorial_id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El autor y editorial son requeridos',
      });
    } else {
      await axios
        .post(booksAPI, {
          name: bookName,
          available_quantity: Number(bookAvailableQuantity),
          library_location: bookLibraryLocation,
          authorId: authorOption.author_id,
          editorialId: editorialOption.editorial_id,
        })
        .then(({ data, statusText }) => {
          console.log(statusText);
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: `Libro #${data.id} agregado`,
            text: `Libro agregado correctamente.`,
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/book');
        })
        .catch(({ response }) => {
          const { data } = response;
          Swal.fire({
            icon: 'error',
            title: response.statusText,
            text: data.message[0],
          });
        });
    }
  }

  async function handleCancel() {
    navigate('/book');
  }

  return (
    <div className="row">
      <div className="col mb-4">
        <form onSubmit={handleSubmit} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Agregar libro</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Nombre del libro</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                required
                onChange={(e) => {
                  setBookName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cantidad MAX</label>
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad MAX"
                required
                onChange={(e) => {
                  setBookAvailableQuantity(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ubicación en la biblioteca</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ubicación en la biblioteca"
                required
                onChange={(e) => {
                  setBookLibraryLocation(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <EditorialDropdown
                editorials={editorials}
                editorialOptionClick={(option) => editorialOptionClick(option)}
              />
            </div>
            <div className="mb-3">
              <AuthorDropdown
                authors={authors}
                authorOptionClick={(option) => authorOptionClick(option)}
              />
            </div>
          </div>
          <div className="form-footer p-3">
            <button type="submit" className="btn btn-primary mr-2">
              Agregar libro
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

  async function editorialOptionClick(option) {
    setEditorialOption(option.value);
  }

  async function authorOptionClick(option) {
    setAuthorOption(option.value);
  }
}
