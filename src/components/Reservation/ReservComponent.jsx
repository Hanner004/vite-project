import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReservComponent({ reserv }) {
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="col mb-4">
        <form className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Información de la reserva #{reserv.reservation_id}</h3>
          </div>
          <div className="form-body border-bottom p-3">

            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label className="form-label">Estado de la reserva</label>
                  <input type="text" className="form-control" disabled value={reserv.reservation_status || ''} />
                </div>
                <div className="col">
                  <label className="form-label">DNI del cliente</label>
                  <input type="text" className="form-control" disabled value={reserv.client_dni || ''} />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label className="form-label">Nombre del cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={reserv.client_name + ' ' + reserv.client_lastname || ''}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label className="form-label">Teléfono del cliente</label>
                  <input type="text" className="form-control" disabled value={reserv.client_phone || ''} />
                </div>
                <div className="col">
                  <label className="form-label">Correo del cliente</label>
                  <input type="text" className="form-control" disabled value={reserv.client_email || ''} />
                </div>
              </div>
            </div>
            
          </div>
          <div className="form-footer p-3 align-items-right">
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/reservation')}>
                Regresar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
