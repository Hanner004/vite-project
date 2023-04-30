import React from "react";

import Error from "../Handle/Error";
import Loading from "../Handle/Loading";
import {getEditorials} from "../API/EditorialAPI";

export default function Editorial() {
  const {data, loading, error} = getEditorials();
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
        {data?.map((result, index) => (
          <div className="col-md-4 mb-4" key={result.editorial_id}>
            <div className="card">
              {/* <img src={result.image} className="card-img-top" alt={result.editorial_name} /> */}
              <div className="card-body">
                <h5 className="card-title">{result.editorial_name}</h5>
                <p className="card-text">{result.editorial_description}</p>
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
