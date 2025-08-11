import { useState, useEffect, useCallback } from 'react';
import { ServicesReservas } from '../../services/servicesReservas';

const useListarReservas = (mostrarMensajeError) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarReservas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ServicesReservas.obtenerReservas();
      setReservas(data);
    } catch (err) {
      console.error("Error en cargarReservas:", err);
      setError(err.message || 'Error al cargar reservas');
      mostrarMensajeError(err.message || 'Error al cargar reservas');
    } finally {
      setLoading(false);
    }
  }, [mostrarMensajeError]);

  const eliminarReservaPorId = async (id) => {
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar esta reserva?');
    if (!confirmado) return;

    try {
      const eliminada = await ServicesReservas.eliminarReserva(id);
      if (eliminada) await cargarReservas();
      return eliminada;
    } catch (error) {
      console.error("Error al eliminar:", error);
      mostrarMensajeError("No se pudo eliminar la reserva.");
    }
  };

  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);

  return {
    reservas,
    loading,
    error,
    eliminarReservaPorId
  };
};

export default useListarReservas;

