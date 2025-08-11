import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useCalendarioReserva from '../../../hooks/hooksReservas/useCalendarioReservas.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../reservas/componentsReservas/calendarioReservas.css'
import HorarioReservas from './horariosReserva.jsx';

const CalendarioReserva = ({ onSiguiente, onVolver, datosCliente }) => {
  console.log(datosCliente)
  const {
    fechaSeleccionada,
    handleFechaChange,
    handleSiguiente,
    formatFecha,
    errorFecha,
    setErrorFecha,
    setHorarioSeleccionado
    
  } = useCalendarioReserva(onSiguiente, datosCliente);

  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const goToPreviousMonth = () => {
    setActiveStartDate(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1)
    );
    setErrorFecha('');
  };

  const goToNextMonth = () => {
    setActiveStartDate(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1)
    );
    setErrorFecha('');
  };

  const onActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate);
    setErrorFecha('');
  };

  const isPreviousMonthButtonDisabled =
    activeStartDate.getFullYear() === currentYear &&
    activeStartDate.getMonth() === currentMonth;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={6} className="d-flex flex-column align-items-center">
          <h2 className="text-center mb-4">Selecciona la Fecha de tu Reserva</h2>

          {/* Navegación de calendario con íconos */}
          <div className="d-flex justify-content-between align-items-center w-100 mb-3">
            <Button
              variant="light"
              onClick={goToPreviousMonth}
              disabled={isPreviousMonthButtonDisabled}
              className="d-flex align-items-center justify-content-center"
              style={{ width: 50, height: 40 }}
            >
              <FiChevronLeft size={24} />
            </Button>

            <div className="text-center flex-grow-1 fs-3 text-danger-emphasis fw-bold">
              {activeStartDate.toLocaleString('es-AR', {
                month: 'long',
                year: 'numeric',
              })}
            </div>

            <Button
              variant="light"
              onClick={goToNextMonth}
              className="d-flex align-items-center justify-content-center"
              style={{ width: 50, height: 40 }}
            >
              <FiChevronRight size={24} />
            </Button>
          </div>

          {/* Calendario */}
          <div className="w-100">
            <Calendar
              value={fechaSeleccionada}
              onChange={handleFechaChange}
              locale="es-AR"
              activeStartDate={activeStartDate}
              showNavigation={false}
              className="w-100"
              onActiveStartDateChange={onActiveStartDateChange}
            />
          </div>

          {/* Fecha seleccionada */}
          <p className="mt-2 text-center">Fecha seleccionada: {formatFecha(fechaSeleccionada)}</p>

          {/* Error */}
          {errorFecha && (<p className="text-danger text-center">{errorFecha}</p>)}
        </Col>
      </Row>

      {fechaSeleccionada && (
            <HorarioReservas
              fechaSeleccionada={fechaSeleccionada}
              servicioSeleccionado={datosCliente.service}
              colaboradorSeleccionado={datosCliente.collaborator}
              onSeleccionarHorario={setHorarioSeleccionado}
            />
          )}

      {/* Botones Volver / Siguiente */}
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={10} lg={6}>
          <div className="d-flex flex-column flex-sm-row justify-content-between">
            <Button
              variant="secondary"
              onClick={onVolver}
              className="mb-2 mb-sm-0 w-100 me-sm-2"
            >
              Volver
            </Button>
            <Button
              variant="primary"
              onClick={handleSiguiente}
              // disabled={!fechaSeleccionada}
              className="w-100 ms-sm-2"
            >
              Siguiente
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CalendarioReserva;

