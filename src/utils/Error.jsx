import React from "react";

export default function Error({message}) {
  return (
    <div className="col-12">
      <div className="alert alert-danger">{message}</div>
    </div>
  );
}
