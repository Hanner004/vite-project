import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { booksAPI, editorialAPI, authorAPI } from '../../utils/routesFormat';
import EditorialDropdown from '../Dropdown/EditorialDropdown';
import AuthorDropdown from '../Dropdown/AuthorDropdown';

export default function UpdateBook() {
  //dropdown-data
  const [editorials, setEditorials] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

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

  //dropdown-default-data
  const [defaultEditorial, setDefaultEditorial] = useState({});
  const [defaultAuthor, setDefaultAuthor] = useState({});

  //select-option
  const [editorialOption, setEditorialOption] = useState({});
  const [authorOption, setAuthorOption] = useState({});

  //book-state
  const { bookId } = useParams();
  const [bookName, setBookName] = useState('');
  const [bookAvailableQuantity, setBookAvailableQuantity] = useState(null);
  const [bookLibraryLocation, setBookLibraryLocation] = useState('');

  async function getBookById() {
    await axios
      .get(booksAPI + `/${bookId}`)
      .then(({ data }) => {
        setBookName(data.book_name);
        setBookAvailableQuantity(data.book_available_quantity);
        setBookLibraryLocation(data.book_library_location);
        const Editorial = {
          editorial_id: data.editorial_id,
          editorial_name: data.editorial_name,
          editorial_description: data.editorial_description,
        };
        const Author = {
          author_id: data.author_id,
          author_name: data.author_name,
          author_lastname: data.author_lastname,
        };
        setEditorialOption(Editorial);
        setAuthorOption(Author);
        setDefaultEditorial({
          value: Editorial,
          label: `#${Editorial.editorial_id} - ${Editorial.editorial_name}`,
        });
        setDefaultAuthor({
          value: Author,
          label: `#${Author.author_id} - ${Author.author_name} ${Author.author_lastname}`,
        });
      })
      .catch(({ message }) => console.log(message));
  }

  useEffect(() => {
    getBookById();
    getEditorials();
    getAuthors();
  }, []);

  async function handleUpdate(event) {
    event.preventDefault();
    if (!authorOption.author_id || !editorialOption.editorial_id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El autor y editorial son requeridos',
        confirmButtonColor: 'Gray',
      });
    } else {
      await axios
        .put(booksAPI + `/${bookId}`, {
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
            title: `Libro #${bookId} editado`,
            text: `Libro actualizado correctamente.`,
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/book');
        })
        .catch(({ response }) => {
          const { data } = response;
          console.log(data);
          Swal.fire({
            icon: 'error',
            title: response.statusText,
            text: data.message[0],
            confirmButtonColor: 'Gray',
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
        <form onSubmit={handleUpdate} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Actualizar libro #{`${bookId}`}</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Nombre del libro</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={bookName || ''}
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
                min="1"
                step="1"
                pattern="[0-9]*"
                className="form-control"
                placeholder="Cantidad MAX"
                value={bookAvailableQuantity || ''}
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
                value={bookLibraryLocation || ''}
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
                defaultValue={defaultEditorial}
              />
            </div>
            <div className="mb-3">
              <AuthorDropdown
                authors={authors}
                authorOptionClick={(option) => authorOptionClick(option)}
                defaultValue={defaultAuthor}
              />
            </div>
          </div>
          <div className="form-footer p-3">
            <button type="submit" className="btn btn-primary mr-2">
              Actualizar libro
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
