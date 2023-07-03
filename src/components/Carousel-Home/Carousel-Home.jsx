import React from 'react';
import { Carousel } from 'react-bootstrap';

import './Carousel-Home.css';

export default function Carousel_Home() {
  return (
    <div className="row mb-4">
      <div className="col">
        <Carousel>
          <Carousel.Item>
            <div className="carousel-item-content">
              <img className="d-block w-100" src="/carousel-images/slide1.jpg" alt="First slide" />
              <div className="carousel-caption">
                <h3>Conozca nuestra plataforma de libros</h3>
                {/* <p>
              Explora nuestra plataforma y accede a una amplia variedad de
              libros.
            </p> */}
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-item-content">
              <img className="d-block w-100" src="/carousel-images/slide2.jpg" alt="Second slide" />
              <div className="carousel-caption">
                <h3>Explora nuestro catálogo de libros</h3>
                {/* <p>
              Descubre una amplia selección de libros en nuestra plataforma.
              Encuentra tu próxima lectura y sumérgete en un mundo de
              conocimiento.
            </p> */}
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-item-content">
              <img className="d-block w-100" src="/carousel-images/slide3.jpg" alt="Third slide" />
              <div className="carousel-caption">
                <h3>Explora los senderos de la sabiduría literaria</h3>
                {/* <p>
              Embárcate en un viaje inolvidable a través de nuestra plataforma
              de libros. Descubre tesoros literarios, sumérgete en emocionantes
              tramas y despierta tu imaginación. ¡Únete a nuestra expedición
              literaria y conquista nuevos horizontes de conocimiento!
            </p> */}
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
