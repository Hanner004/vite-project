import React from "react";

import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="row">
      {/* mt-4 mb-4 added in div class col-12 */}
      <div className="col-12 mt-4 mb-4">
        {/* start-navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* ms-4 added in BookReverse <a> */}
          <a className="navbar-brand ms-4" href="/">
            BookReserve
          </a>
          {/* me-4 added in navbar-toggler button */}
          <button className="navbar-toggler me-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/editorial">
                  Editorial
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/author">
                  Autores
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/book">
                  Libros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="/reservation">
                  Reserve
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* end-navbar */}
      </div>
    </div>
  );
}
