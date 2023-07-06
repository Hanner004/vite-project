import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  let accessToken = localStorage.getItem('accessToken');
  let role = localStorage.getItem('role');
  const closeSession = () => {
    navigate('/');
    localStorage.clear();
  };
  return (
    <div className="row">
      <div className="col-12 mt-4 mb-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand mx-4" onClick={() => navigate('/')}>
            <img src="/logo_preview.svg" height="100" />
          </a>
          <button
            className="navbar-toggler mx-4"
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

            {accessToken ? (
              <>

                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/editorial')}>
                      Editoriales
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/author')}>
                      Autores
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/book')}>
                      Libros
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/reservation')}>
                      Reservaciones
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/client')}>
                      Clientes
                    </a>
                  </li>
                </ul>

                <ul className="nav navbar-nav mx-auto navbar-right">
                  <Dropdown className="custom-dropdown">
                    <Dropdown.Toggle variant="dark" className="custom-toggle">
                      {role}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-menu">
                      <Dropdown.Item onClick={closeSession} className="btn btn-secondary">
                        Cerrar sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
                
              </>
            ) : (
              <>
                <ul className="nav navbar-nav mx-auto navbar-right">
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => navigate('/login')}>
                      Iniciar sesión
                    </a>
                  </li>
                </ul>
              </>
            )}

          </div>
        </nav>
      </div>
    </div>
  );
}
