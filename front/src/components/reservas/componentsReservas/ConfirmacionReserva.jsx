import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { formatFecha } from '../../../utils/formatFecha';
import useConfirmacionReserva from '../../../hooks/hooksReservas/useConfirmacionReserva';

const ConfirmacionReserva = ({ onVolver, onCancelar, reservaData, onConfirmar }) => {
  console.log(reservaData)
  const {
    confirmacionError,
    isConfirming,
    duplicado,
    handleConfirmarReservaInterno,
  } = useConfirmacionReserva(reservaData, onVolver, onCancelar, onConfirmar);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Confirmar Reserva</h2>



          <p>Por favor, revisa los siguientes datos antes de confirmar tu reserva:</p>
          <ul className="list-unstyled">
            <li><strong>Nombre:</strong> {reservaData.name}</li>
            <li><strong>DNI:</strong> {reservaData.dni}</li>
            <li><strong>Colaborador:</strong> {reservaData.collaboratorName}</li>
            <li><strong>Servicio:</strong> {reservaData.service}</li>
            <li><strong>Día:</strong> {formatFecha(reservaData.date)}</li>
            <li><strong>Hora:</strong> {reservaData.time || "Error"} </li>
          </ul>

          {confirmacionError && (
            <Alert variant="danger" className="mt-3">
              {confirmacionError}
            </Alert>
          )}

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={onVolver}>Volver</Button>

            {duplicado ? (
                <Button variant="danger" onClick={onCancelar}>Cancelar</Button>
              ) : (
                <Button
                  variant="success"
                  onClick={handleConfirmarReservaInterno}
                  disabled={isConfirming}
                >
                  Confirmar Reserva
                </Button>
              )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmacionReserva;

