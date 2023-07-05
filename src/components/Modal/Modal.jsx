import React from 'react';

export default function Modal({ id, title, textbtn, body, submit }) {
  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={submit}>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="submit" className="btn btn-outline-primary">
                {textbtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
