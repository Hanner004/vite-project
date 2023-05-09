import React from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="row">
      {/* mt-4 mb-4 added in div class col-12 */}
      <div className="col-12 mt-4 mb-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* ms-4 added in BookReverse <a> */}
          <a className="navbar-brand ms-4" onClick={() => navigate("/")}>
            BookReserve
          </a>
          {/* me-4 added in navbar-toggler button */}
          <button
            className="navbar-toggler me-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/")}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/editorial")}>
                  Editorial
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/author")}>
                  Autores
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/book")}>
                  Libros
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => navigate("/reservation")}
                >
                  Reserve
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
