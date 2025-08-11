import React from 'react';
import { Spinner } from 'react-bootstrap';

function Cargando({ mensaje }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{mensaje || 'Cargando...'}</span>
      </Spinner>
      {mensaje && <span className="ms-2">{mensaje}</span>}
    </div>
  );
}

export default Cargando;