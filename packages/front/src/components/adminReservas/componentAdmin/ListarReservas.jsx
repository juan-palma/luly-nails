import { useState } from 'react';
import { Table, Button, Alert, Form } from 'react-bootstrap';
import useListarReservas from '../../../hooks/hooksReservas/useListarReservas';
import { formatFecha } from '../../../utils/formatFecha';

const ListarReservas = ({ mostrarMensajeError }) => {
  const [filtroColaborador, setFiltroColaborador] = useState('');
  const { reservas, loading, error, eliminarReservaPorId } = useListarReservas(mostrarMensajeError);

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  // const reservasFiltradas = reservas.filter(reserva =>
  //   reserva.collaborator?.name?.toLowerCase().includes(filtroColaborador.toLowerCase())
  // );

  const reservasFiltradas = Array.isArray(reservas)
  ? reservas.filter(reserva =>
      reserva.collaborator?.name?.toLowerCase().includes(filtroColaborador.toLowerCase())
    )
  : [];


  return (
    <div>
      <h2>Lista de Reservas</h2>

      <Form.Group className="mb-3" controlId="filtroColaborador">
        <Form.Label className=' text-dark fw-bold'>Filtrar por colaborador</Form.Label>
        <Form.Control
          type="text"
          placeholder="Escribí el nombre del colaborador"
          value={filtroColaborador}
          onChange={(e) => setFiltroColaborador(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre del Cliente</th>
            <th>DNI del Cliente</th>
            <th>Colaborador</th>
            <th>Servicio</th>
            <th>Día</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservasFiltradas.map(reserva => (
            <tr key={reserva._id}>
              <td>{reserva.name || 'No asignado'}</td>
              <td>{reserva.dni || 'No asignado'}</td>
              <td>{reserva.collaborator?.name || 'No asignado'}</td>
              <td>{reserva.service || 'No asignado'}</td>
              <td>{formatFecha(reserva.date)}</td>
              <td>{reserva.time}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => eliminarReservaPorId(reserva._id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListarReservas;
