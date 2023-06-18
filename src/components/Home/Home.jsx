import React from 'react';
import Carousel_Home from '../Carousel-Home/Carousel-Home';
import HomeBook from './Home-Book';

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
          <h3 className="text-center m-0 p-0">Libros disponibles</h3>
        </div>
      </div>
      <div className="row">
        <div className="col mb-4">
          <HomeBook />
        </div>
      </div>
    </>
  );
}
