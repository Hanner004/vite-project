import React from "react";

export default function Navbar() {
  return (
    <div className="row">
      {/* mt-4 mb-4 added in div class col-12 */}
      <div className="col-12 mt-4 mb-4">
        {/* start-navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* ms-4 added in BookReverse <a> */}
          <a className="navbar-brand ms-4" href="#">
            BookReserve
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Editorial
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Autores
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Disabled
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
