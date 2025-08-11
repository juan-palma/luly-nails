import React from 'react';
import useReservas from "../../hooks/hooksReservas/useReservas";
import Introduccion from "./componentsReservas/Introduccion";
import FormDatosCliente from "./componentsReservas/FormDatosCliente";
import ColaboradorServicio from "./componentsReservas/ColaboradorServicio";
import ConfirmacionReserva from "./componentsReservas/ConfirmacionReserva";
import { Button, Container } from 'react-bootstrap';
import CalendarioReserva from './componentsReservas/CalendarioReservas';

function Reservas() {
  const {
    currentSection,
    reservaData,
    setCurrentSection,
    setReservaData,
    handleSiguiente,
    handleVolver,
  } = useReservas();

  const handleConfirmarReserva = () => {
    setCurrentSection('reserva-exitosa');
  };

  const handleNuevoTurno = () => {
    setReservaData({});
    setCurrentSection('introduccion');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'introduccion':
        return <Introduccion onSiguiente={() => handleSiguiente({})} />;
      case 'formulario-datos':
        return <FormDatosCliente onSiguiente={handleSiguiente} onVolver={handleVolver} />;
      case 'colaborador-servicio':
        return <ColaboradorServicio onVolver={handleVolver} onSiguiente={handleSiguiente} reservaData={reservaData} />;
      case 'calendario-reserva':
        return <CalendarioReserva onVolver={handleVolver} onSiguiente={handleSiguiente} datosCliente={reservaData} />;
      case 'confirmacion-reserva':
        return <ConfirmacionReserva onVolver={handleVolver} reservaData={reservaData} onConfirmar={handleConfirmarReserva} onCancelar={handleNuevoTurno}/>
      case 'reserva-exitosa':
        return (
          <Container className="my-5 text-center">
            <h2>¡Reserva Confirmada!</h2>
            <p>Gracias por tu reserva. Te esperamos!.</p>
            <Button variant="primary" onClick={handleNuevoTurno}>Nuevo Turno</Button>
          </Container>
        );
      default:
        return <Introduccion onSiguiente={() => handleSiguiente({})} />;
    }
  };

  return (
    <>
      {renderSection()}
    </>
  );
}

export default Reservas;

