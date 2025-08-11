import React, { useState } from 'react';
import { Table, Button, Alert, Container, Row, Col } from 'react-bootstrap'; 
import useListarElementos from '../../../hooks/hooksAdmin/useListarElementos';
import Cargando from './Cargando';
import EditarElementoModal from './editarElementosModal';

function ListarElementos({ tipo, mostrarMensajeError }) {
  const [elementoAEditar, setElementoAEditar] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [errorModal, setErrorModal] = useState('');

  const {
    elementos,
    loading,
    error,
    handleEliminar,
    actualizandoId,
    mensajeExitoActualizacion,
    handleActualizarElemento,
    mensajeExitoEliminacion,
    mensajeErrorEliminacion,
  } = useListarElementos(tipo, mostrarMensajeError);

  const handleEditar = (elemento) => {
    setElementoAEditar(elemento);
    setMostrarModalEditar(true);
    setErrorModal('');
  };

  const handleCerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setElementoAEditar(null);
    setErrorModal('');
  };

  const handleGuardarEdicion = async (id, datosActualizados) => {
    const exito = await handleActualizarElemento(id, datosActualizados, setErrorModal);
    if (exito) {
      handleCerrarModalEditar();
    }
  };

  if (loading) {
    return <Cargando mensaje={`Cargando ${tipo}...`} />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <Container fluid>
      <h2>Lista de {tipo === 'servicio' ? 'Servicios' : 'Colaboradores'}</h2>
      {mensajeExitoActualizacion && <div className="alert alert-success mt-3">{mensajeExitoActualizacion}</div>}
      {mensajeExitoEliminacion && <div className="alert alert-success mt-3">{mensajeExitoEliminacion}</div>}
      {mensajeErrorEliminacion && <div className="alert alert-danger mt-3">{mensajeErrorEliminacion}</div>}

      <EditarElementoModal
        tipo={tipo}
        elemento={elementoAEditar}
        show={mostrarModalEditar}
        onHide={handleCerrarModalEditar}
        onElementoActualizado={handleGuardarEdicion}
        actualizando={actualizandoId === elementoAEditar?._id}
        errorRecarga={errorModal}
      />

      <div className="table-responsive mt-3"> 
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              {tipo === 'colaborador' && <th>Servicio</th>}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {elementos.map(elemento => (
              <tr key={elemento._id}>
                <td>{elemento.name}</td>
                {tipo === 'colaborador' && <td>{elemento.service}</td>}
                <td>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleEditar(elemento)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleEliminar(elemento._id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default ListarElementos;


