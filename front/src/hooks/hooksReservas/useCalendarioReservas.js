import { useState } from 'react';

const useCalendarioReserva = (onSiguiente, datosCliente) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [errorFecha, setErrorFecha] = useState('');

  const formatFecha = (date) => {
    return date
      ? date.toLocaleDateString('es-AR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Ninguna';
  };

  const handleFechaChange = (date) => {
    const hoy = new Date();
    const fechaSinHora = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMesProximo = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);

    // Validaciones:
    if (fechaSinHora < hoySinHora) {
      setErrorFecha('Error, debe seleccionar una fecha valida para continuar.');
      setFechaSeleccionada(null);
      return;
    }

    if (fechaSinHora.getTime() === hoySinHora.getTime()) {
      setErrorFecha('Tenemos todos los turnos resrvados del dia.');
      setFechaSeleccionada(null);
      return;
    }

    if (fechaSinHora.getDay() === 0) {
      setErrorFecha('No hay turnos disponibles los Domingos.');
      setFechaSeleccionada(null);
      return;
    }

    if (fechaSinHora < inicioMesActual || fechaSinHora > finMesProximo) {
      setErrorFecha('La agenda aún no está disponible para esa fecha.');
      setFechaSeleccionada(null);
      return;
    }

    // Si pasa todas las validaciones:
    setFechaSeleccionada(date);
    setErrorFecha('');
  };

  const handleSiguiente = () => {
    if (!fechaSeleccionada) {
      setErrorFecha('Por favor seleccioná una fecha válida para continuar.');
      return;
    }

    setErrorFecha('');
    onSiguiente({
      ...datosCliente,
      date: fechaSeleccionada,
      time: horarioSeleccionado
    });
  };

  return {
    fechaSeleccionada,
    handleFechaChange,
    handleSiguiente,
    formatFecha,
    errorFecha,
    setErrorFecha,
    horarioSeleccionado,
    setHorarioSeleccionado
  };
};

export default useCalendarioReserva;

