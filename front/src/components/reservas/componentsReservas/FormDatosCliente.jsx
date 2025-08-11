import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import useFormDatosCliente from '../../../hooks/hooksReservas/useFormDatosCliente';
import InformacionReserva from './InformacionReserva';
import { useState, useEffect } from 'react';

const FormDatosCliente = ({ onSiguiente, onVolver }) => {
  const {
    nombre,
    dni,
    errores,
    handleInputChange,
    validarCampo,
    reservaExiste,
    cargandoReserva
  } = useFormDatosCliente();

  const [mostrarNombreInput, setMostrarNombreInput] = useState(false);
  const [mostrarReservas, setMostrarReservas] = useState(false);
  const [siguienteHabilitado, setSiguienteHabilitado] = useState(false);

  useEffect(() => {
    if (dni.trim().length >= 6 && reservaExiste && reservaExiste.length > 0) {
      setMostrarReservas(true);
      setSiguienteHabilitado(false);
    } else {
      setMostrarReservas(false);
      setSiguienteHabilitado(dni.trim().length >= 6 && !(reservaExiste && reservaExiste.length > 0));
      setMostrarNombreInput(false);
    }
  }, [dni, reservaExiste]);

  const handleSiguienteSinReserva = () => {
    const erroresDni = validarCampo('dni', dni);
    if (Object.keys(erroresDni).length > 0) return;
    setMostrarNombreInput(true);
  };

  const handleSubmitNombre = (event) => {
    event.preventDefault();
    const erroresNombre = validarCampo('nombre', nombre);
    if (Object.keys(erroresNombre).length > 0) return;
    onSiguiente({ name: nombre, dni });
  };

  const handleCerrarReservaExistente = () => {
    setMostrarReservas(false);
    setTimeout(() => {
      setSiguienteHabilitado(true);
    }, 0);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Ingrese sus datos</h2>

          <Alert variant="warning" className="text-center">
            <p>Recuerde <strong>NO</strong> es necesario su Nombre completo si no lo desea ☺️</p>
            <p>❗Pero <strong>SÍ</strong> es importante que indique correctamente su <strong>DNI</strong></p>
          </Alert>

          {/* Formulario DNI */}
          {!mostrarReservas && !mostrarNombreInput && (
            <Form onSubmit={(e) => e.preventDefault()}> {/* Evitar la recarga de página */}
              <Form.Group className="mb-3" controlId="formDni">
                <Form.Label>DNI:</Form.Label>
                <Form.Control
                  type="text"
                  name="dni"
                  value={dni}
                  onChange={handleInputChange}
                  isInvalid={!!errores.dni}
                />
                <Form.Control.Feedback type="invalid">{errores.dni}</Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={onVolver}>Volver</Button>
                <Button
                  variant="primary"
                  onClick={handleSiguienteSinReserva}
                  disabled={!siguienteHabilitado || cargandoReserva || mostrarReservas}
                >
                  Siguiente
                </Button>
              </div>
            </Form>
          )}

          {/* Mensaje de cargando reserva */}
          {cargandoReserva && !mostrarReservas && (
            <div className="d-flex justify-content-center align-items-center mt-4 text-secondary">
              <Spinner animation="border" size="sm" className="me-2" />
              Verificando reserva existente...
            </div>
          )}

          {/* Mostrar reservas existentes */}
          {mostrarReservas && reservaExiste && reservaExiste.length > 0 && (
            <div className="mt-4">
              <InformacionReserva reservas={reservaExiste} onCerrar={handleCerrarReservaExistente} />
            </div>
          )}

          {/* Formulario Nombre */}
          {mostrarNombreInput && !mostrarReservas && (
            <Form onSubmit={handleSubmitNombre}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={handleInputChange}
                  isInvalid={!!errores.nombre}
                />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={onVolver}>Volver</Button>
                <Button variant="primary" type="submit">Siguiente</Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FormDatosCliente;

