import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import './editarElementosModal.css'

function EditarElementoModal({
  tipo,
  elemento,
  show,
  onHide,
  onElementoActualizado,
  actualizando,
  errorRecarga,
}) {
  const [nombre, setNombre] = useState('');
  const [servicio, setServicio] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState({});

  useEffect(() => {
    if (elemento) {
      setNombre(elemento.name);
      if (tipo === 'colaborador') {
        setServicio(elemento.service);
      }
      setErroresValidacion({});
    }
  }, [elemento, tipo, show]);

  const validarFormulario = () => {
    let errores = {};
    if (!nombre.trim()) {
      errores.nombre = 'El nombre es requerido.';
    } else if (nombre[0] !== nombre[0].toUpperCase()) {
      errores.nombre = 'La primera letra debe ser mayúscula.';
    }

    if (tipo === 'colaborador') {
      if (!servicio.trim()) {
        errores.servicio = 'El servicio es requerido.';
      } else if (servicio[0] !== servicio[0].toUpperCase()) {
        errores.servicio = 'La primera letra del servicio debe ser mayúscula.';
      }
    }

    setErroresValidacion(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = () => {
    if (!validarFormulario()) {
      return;
    }

    const datosActualizados = {
      name: nombre,
    };
    if (tipo === 'colaborador') {
      datosActualizados.service = servicio;
    }

    onElementoActualizado(elemento._id, datosActualizados);
  };

  return (
    <Modal show={show} onHide={onHide} className='modalResponsive'>
      <Modal.Header closeButton>
        <Modal.Title>Editar {tipo === 'servicio' ? 'Servicio' : 'Colaborador'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={actualizando}
            />
            {erroresValidacion.nombre && <Form.Text className="text-danger">{erroresValidacion.nombre}</Form.Text>}
          </Form.Group>

          {tipo === 'colaborador' && (
            <Form.Group controlId="servicio">
              <Form.Label>Servicio</Form.Label>
              <Form.Control
                type="text"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                disabled={actualizando}
              />
              {erroresValidacion.servicio && <Form.Text className="text-danger">{erroresValidacion.servicio}</Form.Text>}
            </Form.Group>
          )}

          {errorRecarga && <Alert variant="danger" className="mt-3">{errorRecarga}</Alert>} 
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={actualizando}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={actualizando}>
          {actualizando ? 'Guardando...' : 'Guardar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditarElementoModal;

