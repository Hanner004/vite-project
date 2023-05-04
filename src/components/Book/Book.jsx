import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {booksAPI} from "../../utils/routesFormat";
import Swal from "sweetalert2";
import Toolbar from "../Toolbar/Toolbar";
import Error from "../../utils/Error";
import InfoNotFound from "../../utils/InfoNotFound";

export default function Book() {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  function getBooks() {
    fetch(booksAPI)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => setError(error.message));
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
              <img src="/book.jpg" className="card-img-top" alt={item.book_name} />
              <div className="card-body">
                <h5 className="card-title">
                  #{item.book_id} - {item.book_name}
                </h5>
                <p className="card-text">
                  {item.book_library_location} - MAX: {item.book_available_quantity}
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

  function deleteBook(book_id) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este libro?",
      text: `Estás a punto de eliminar el libro con el identificador #${book_id}. ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer. Por favor, asegúrate de que esta sea la acción que deseas tomar antes de proceder.`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#20515C",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(booksAPI + `/${book_id}`, {method: "DELETE"})
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error.message))
          .finally(() => {
            Swal.fire({
              icon: "success",
              title: "Libro eliminado",
              text: "Libro eliminado correctamente.",
              showConfirmButton: false,
              timer: 2000,
            });
            getBooks();
          });
      }
    });
  }
}
