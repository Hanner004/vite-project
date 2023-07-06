import { warningToastAlert, errorToastAlert, successToastAlert } from '../../utils/Swal/sweet-alert';
import { clientAPI, booksAPI, reservationAPI } from '../../utils/routesFormat';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import ClientDropdown from '../Dropdown/ClientDropdown';
import InfoNotFound from '../../utils/InfoNotFound';

export default function CreateReservation() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [books, setBooks] = useState([]);
  const [clientOption, setClientOption] = useState({});

  async function getClients() {
    await axios
      .get(clientAPI)
      .then(({ data }) => setClients(data))
      .catch(({ message }) => console.log(message));
  }

  async function getAvailableBooks() {
    await axios
      .get(booksAPI + `/available`)
      .then(({ data }) => setBooks(data))
      .catch(({ message }) => console.log(message));
  }

  useEffect(() => {
    getClients();
    getAvailableBooks();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!clientOption.client_id) {
      warningToastAlert('El cliente es requerido en la reserva');
    } else {
      const booksToSave = selectedItems.map(({ numericValue, value }) => ({
        bookId: value.book_id,
        quantity: numericValue,
      }));
      console.log('booksToSave', booksToSave);
      await axios
        .post(reservationAPI, {
          clientId: clientOption.client_id,
          books: booksToSave,
        })
        .then(({ data, statusText }) => {
          console.log(statusText);
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: `Reserva agregada`,
            text: `Reserva agregada correctamente.`,
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/reservation');
        })
        .catch(({ response }) => {
          const { data, status } = response;
          console.log(response.status);
          console.log(data.message);
          if (status === 409) {
            if (data.message === 'client has an active reservation') {
              return Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'El cliente tiene una reserva activa',
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
  }

  async function handleCancel() {
    navigate('/reservation');
  }

  const [selectedItem, setSelectedItem] = useState(null);
  const [numericValue, setNumericValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);

  console.log('selectedItems', selectedItems);

  const handleAddItem = () => {
    if (selectedItem) {
      if (parseInt(numericValue) > parseInt(selectedItem.value.book_available)) {
        setNumericValue(String(selectedItem.value.book_available));
        warningToastAlert('Se ha excedido el valor máximo permitido de la cantidad disponible del libro');
      } else {
        if (numericValue.trim() === '') return;
        setSelectedItems((prevItems) => [...prevItems, { ...selectedItem, numericValue: parseInt(numericValue) }]);

        const deleted = books.find((i) => i.book_id === selectedItem.value.book_id);
        setDeletedItems([...deletedItems, deleted]);

        const list = books.filter((obj) => obj.book_id !== selectedItem.value.book_id);
        setBooks(list);

        setSelectedItem(null);
        setNumericValue('');
      }
    }
  };

  const handleRemoveItem = (index, res) => {
    const allow = deletedItems.find((i) => i.book_id === res.value.book_id);
    const newArray = [...books, allow];
    setBooks(newArray);

    const list = deletedItems.filter((obj) => obj.book_id !== res.value.book_id);
    setDeletedItems(list);

    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

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
                <ClientDropdown clients={clients} clientOptionClick={(option) => clientOptionClick(option)} />
              </div>
              <div className="mb-3">
                <div className="row">
                  <label className="form-label">Libro disponible</label>
                  <div className="col">
                    <Select
                      value={selectedItem}
                      onChange={setSelectedItem}
                      options={books.map((i) => {
                        return {
                          value: i,
                          label: `ID: ${i.book_id} - Nombre del libro: ${i.book_name} - ISBN: ${i.book_isbn_code} - Cantidad disponible: ${i.book_available}`,
                        };
                      })}
                      placeholder="..."
                    />
                  </div>
                  <div className="col-4">
                    <input
                      disabled={!selectedItem}
                      type="number"
                      min="1"
                      step="1"
                      pattern="[0-9]*"
                      className={borderInputQuantityColor()}
                      placeholder="Cantidad"
                      value={numericValue}
                      onChange={(e) => setNumericValue(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    {console.log('selectedItem***', selectedItem)}
                    <button type="button" disabled={numericValue < 1} className="btn btn-outline-primary" onClick={handleAddItem}>
                      <i className="fa-solid fa-circle-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-footer p-3">
              <button type="submit" className="btn btn-outline-primary mr-2" disabled={selectedItems.length === 0}>
                Agregar
              </button>
              &nbsp;
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="table-responsive mb-2">
        <table className="table table-sm">
          <thead className="table-dark">
            <tr className="text-center">
              <th colSpan={8} className="p-3">
                Libros asignados a la reservación
              </th>
            </tr>
          </thead>
          <thead className="table-dark">
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Identificación del libro</th>
              <th scope="col">Nombre del libro</th>
              <th scope="col">Cantidad solicitada</th>
              <th scope="col">ISBN</th>
              <th scope="col">Autor del libro</th>
              <th scope="col">Editorial del libro</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {selectedItems?.map(({ label, numericValue, ...res }, index) => (
              <tr key={index + 1} className="align-middle text-center">
                <th scope="row">{index + 1}</th>
                <td>{res.value.book_id}</td>
                <td>{res.value.book_name}</td>
                <td>{numericValue}</td>
                <td>{res.value.book_isbn_code}</td>
                <td>{res.value.author_name + ' ' + res.value.author_lastname}</td>
                <td>{res.value.editorial_name}</td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() => handleRemoveItem(index, res)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItems.length === 0 && <InfoNotFound />}

    </>
  );

  function borderInputQuantityColor() {
    let res = `form-control`;
    if (selectedItem) {
      if (numericValue) {
        if (parseInt(numericValue) > parseInt(selectedItem?.value?.book_available)) {
          res = `form-control border-danger`;
        } else {
          if (parseInt(numericValue) > 0) {
            res = `form-control border-success`;
          } else {
            res = `form-control border-danger`;
          }
        }
      }
    }
    return res;
  }

  async function clientOptionClick(option) {
    setClientOption(option.value);
  }

  async function bookOptionClick(option) {
    setBookOption(option.value);
  }
}
