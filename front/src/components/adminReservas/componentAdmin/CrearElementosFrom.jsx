import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import useCrearElemento from '../../../hooks/hooksAdmin/useCrearElementosForm';

function CrearElementoForm({ tipo, onElementCreated, onElementError }) {
  const {
    name,
    setName,
    service,
    setService,
    loading,
    erroresValidacion,
    crear,
    handleInputChange,
  } = useCrearElemento(tipo, onElementCreated, onElementError);

  const handleSubmit = (event) => {
    event.preventDefault();
    crear();
  };

  return (
    <Card>
      <Card.Body>
        <h2>Crear {tipo === 'servicio' ? 'Servicio' : 'Colaborador'}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Ingrese nombre del ${tipo === 'servicio' ? 'servicio' : 'colaborador'}`}
              value={name}
              onChange={(e) => handleInputChange(e, setName, 'name')}
              disabled={loading}
            />
            {erroresValidacion.name && (
              <Form.Text className="text-danger">{erroresValidacion.name}</Form.Text>
            )}
          </Form.Group>

          {tipo === 'colaborador' && (
            <Form.Group controlId="servicio">
              <Form.Label>Servicio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el servicio que ofrece"
                value={service}
                onChange={(e) => handleInputChange(e, setService, 'service')}
                disabled={loading}
              />
              {erroresValidacion.service && (
                <Form.Text className="text-danger">{erroresValidacion.service}</Form.Text>
              )}
            </Form.Group>
          )}

          <Button variant="primary" type="submit" disabled={loading} className="mt-3">
            {loading ? `Creando ${tipo}...` : `Crear ${tipo}`}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CrearElementoForm;
