import React from "react";
import Error from "../../utils/Error";
import Loading from "../../utils/Loading";
import {useFetch} from "../../hooks/useFetch";

export default function Home() {
  const {data, loading, error} = useFetch("https://rickandmortyapi.com/api/character");
  return (
    <>
      {/* start-toolbar */}
      <div className="row">
        <div className="col-12 mb-4 text-center">
          <button className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </button>
        </div>
      </div>
      {/* end-toolbar */}
      {/* start-content */}
      <div className="row">
        {error && <Error message={error} />}
        {loading && <Loading />}
        {data?.results?.map((character, index) => (
          <div className="col-md-4 mb-4" key={character.id}>
            <div className="card">
              <img src={character.image} className="card-img-top" alt={character.name} />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">
                  {character.status}, {character.species}, {character.gender}
                </p>
                <button className="btn btn-warning">
                  <i className="fa-solid fa-edit"></i>
                </button>
                &nbsp;
                <button className="btn btn-danger">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* end-content */}
    </>
  );
}
