import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import useColaboradorServicio from '../../../hooks/hooksReservas/useColaboradoresServicios';

const ColaboradorServicio = ({ onSiguiente, onVolver, datosCliente }) => {
  const {
    colaboradores,
    colaboradorSeleccionado,
    loading,
    error,
    handleColaboradorChange,
  } = useColaboradorServicio();

  const [mensajeErrorLocal, setMensajeErrorLocal] = useState(null);

  const handleSubmit = () => {
    if (colaboradorSeleccionado) {
      const colaboradorElegido = colaboradores.find(colaborador => colaborador._id === colaboradorSeleccionado);
      if (colaboradorElegido?.service && colaboradorElegido?.name) {
        onSiguiente({
          ...datosCliente,
          collaborator: colaboradorSeleccionado,
          collaboratorName: colaboradorElegido.name,
          service: colaboradorElegido.service,
        });
        setMensajeErrorLocal(null);
      } else {
        setMensajeErrorLocal('El colaborador seleccionado no tiene un servicio asignado o un nombre.');
      }
    } else {
      setMensajeErrorLocal('Por favor, selecciona un colaborador para continuar.');
    }
  };

  const handleColaboradorSeleccionado = (event) => {
    handleColaboradorChange(event);
    setMensajeErrorLocal(null); 
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-2">Cargando colaboradores...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <div className="alert alert-danger" role="alert">
          Error al cargar colaboradores: {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Selecciona un Colaborador</h2>
          <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <Form.Group className="mb-3" controlId="formColaborador">
              <Form.Label>Colaborador:</Form.Label>
              <Form.Select value={colaboradorSeleccionado} onChange={handleColaboradorSeleccionado}>
                <option value="">Selecciona un colaborador</option>
                {colaboradores.map(colaborador => (
                  <option key={colaborador._id} value={colaborador._id}>
                    {`${colaborador.name} (${colaborador.service})`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {mensajeErrorLocal && (
              <div className="alert alert-danger" role="alert">
                {mensajeErrorLocal}
              </div>
            )}

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={onVolver}>Volver</Button>
              <Button variant="primary" type="submit">
                Siguiente
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ColaboradorServicio;

