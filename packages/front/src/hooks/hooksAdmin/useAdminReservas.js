import { useState, useCallback, useEffect } from 'react';
import { ServicesAdmin } from '../../services/servicesAdmin';

const useAdminReservas = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [mensajeErrorGeneral, setMensajeErrorGeneral] = useState(null);


  const mostrarMensajeExito = useCallback((mensaje) => {
    setMensajeExito(mensaje);
  }, []);

  const mostrarMensajeError = useCallback((mensaje, isListaReservasError = false) => {
    if (!isListaReservasError) {
      setMensajeErrorGeneral(mensaje);
    } else {
      setMensajeErrorGeneral(mensaje); 
    }
  }, []);

  const eliminarReserva = async (id) => {
    try {
      const resultado = await ServicesAdmin.eliminarReserva(id);
      if (resultado.error) {
        throw new Error(resultado.error);
      }
      mostrarMensajeExito('Reserva eliminada con éxito');
      return true;
    } catch (error) {
      mostrarMensajeError(error.message);
      return false;
    }
  };
// por ahora no se usa
  const actualizarReserva = async (reservaActualizada) => {
    try {
      const resultado = await ServicesAdmin.actualizarReserva(reservaActualizada);
      if (resultado.error) {
        throw new Error(resultado.error);
      }
      mostrarMensajeExito('Reserva actualizada correctamente');
      return resultado.elementoActualizado;
    } catch (error) {
      mostrarMensajeError(error.message);
      return null;
    }
  };

  useEffect(() => {
    let timer;
    if (mensajeExito) {
      timer = setTimeout(() => {
        setMensajeExito(null);
      }, 3000);
    } else if (mensajeErrorGeneral) {
      timer = setTimeout(() => {
        setMensajeErrorGeneral(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [mensajeExito, mensajeErrorGeneral]);

  return {
    activeSection,
    setActiveSection,
    mensajeExito,
    mensajeErrorGeneral,
    mostrarMensajeExito,
    mostrarMensajeError,
    eliminarReserva,
    actualizarReserva
  };
};

export default useAdminReservas;

