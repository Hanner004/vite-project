import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";
import Error from "../../utils/Error";
import InfoNotFound from "../../utils/InfoNotFound";
import { booksAPI } from "../../utils/routesFormat";

export default function Book() {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  async function getBooks() {
    await axios
      .get(booksAPI)
      .then(({ data }) => setBooks(data))
      .catch(({ message }) => setError(message));
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <Toolbar toPath={"/book/create"} />
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
                  {item.book_library_location} - MAX:{" "}
                  {item.book_available_quantity}
                </p>
                <Link
                  to={`/book/update/${item.book_id}`}
                  className="btn btn-warning"
                >
                  <i className="fa-solid fa-edit"></i>
                </Link>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBook(item.book_id)}
                >
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
      title: "¿Estás seguro de eliminar este libro?",
      text: `Estás a punto de eliminar el libro con el identificador #${book_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#20515C",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(booksAPI + `/${book_id}`)
          .then(({ data, statusText }) => {
            console.log(statusText);
            console.log(data);
            Swal.fire({
              icon: "success",
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
