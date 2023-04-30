import React from "react";

import Toolbar from "../Toolbar/Toolbar";
import ButtonToUpdate from "../Button/ButtonToUpdate";
import ButtonToDelete from "../Button/ButtonToDelete";

import Error from "../Handle/Error";
import Loading from "../Handle/Loading";

import {useFetch} from "../../useFetch";

export default function Home() {
  const {data, loading, error} = useFetch("https://rickandmortyapi.com/api/character");
  return (
    <>
      <Toolbar />
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
                <ButtonToUpdate />
                &nbsp;
                <ButtonToDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
