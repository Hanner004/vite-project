import React from 'react';

export default function Error({ message }) {
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="alert alert-danger m-0">{message}</div>
      </div>
    </div>
  );
}
