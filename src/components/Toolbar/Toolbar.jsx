import React from "react";
import { Link } from "react-router-dom";

export default function Toolbar({ toPath }) {
  return (
    <div className="row">
      <div className="col-12 mb-4 text-center">
        <Link to={toPath} className="btn btn-dark">
          <i className="fa-solid fa-circle-plus"></i> Añadir
        </Link>
      </div>
    </div>
  );
}
