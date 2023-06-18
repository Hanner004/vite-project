import React from 'react';
import Carousel_Home from '../Carousel-Home/Carousel-Home';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Home() {
  return (
    <>
      <div className="row">
        <div className="col mb-4">
          <Carousel_Home />
        </div>
      </div>
      <div className="row">
        <div className="col mb-4">
          <h3 className="text-center">Libros disponibles</h3>
        </div>
      </div>
      <div className="row">
        <div className="col mb-4"></div>
      </div>
      <div className="row">
        <div className="col mb-4 d-flex justify-content-center align-items-center">
          <Link to="/library" className="btn home-custom-btn">
            Consultar más
          </Link>
        </div>
      </div>
    </>
  );
}
