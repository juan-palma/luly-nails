import { useEffect, useState } from 'react';
import { generarHorarios } from '../../utils/generarHorarios';
import { ServicesReservas } from '../../services/servicesReservas';

const useHorarioReservas = (fechaSeleccionada, servicioSeleccionado, colaboradorSeleccionado, onSeleccionarHorario) => {
  //console.log(fechaSeleccionada, "-", servicioSeleccionado, "-", colaboradorSeleccionado);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [ horariosOcupados, setHorariosOcupados ] = useState([]);

  useEffect(() => {
    const cargarHorarios = async () => {
      if (!fechaSeleccionada || !servicioSeleccionado || !colaboradorSeleccionado) {
        setHorariosDisponibles([]);
        return;
      }
  
      try {
        const todasLasReservas = await ServicesReservas.obtenerReservas();
  
        const fechaStr = new Date(fechaSeleccionada).toISOString().split('T')[0];
  
        const reservasEnFechaServicioColaborador = todasLasReservas.filter(reserva => {
          //console.log(reserva)
          const fechaReserva = new Date(reserva.date).toISOString().split('T')[0];
  
          return (
            fechaReserva === fechaStr &&
            reserva.service.trim().toLowerCase() === servicioSeleccionado.trim().toLowerCase() &&
            reserva.collaborator._id === colaboradorSeleccionado

          );
        });
  
        const horariosReservados = reservasEnFechaServicioColaborador.map(r => r.time);
        const todosHorarios = generarHorarios();
  
        const disponibles = todosHorarios.filter(horario => !horariosReservados.includes(horario));
        setHorariosDisponibles(disponibles);
        setHorariosOcupados(horariosReservados);
      } catch (error) {
        console.error('Error al cargar horarios:', error);
        setHorariosDisponibles([]);
      }
    };
  
    cargarHorarios();
  }, [fechaSeleccionada, servicioSeleccionado, colaboradorSeleccionado]);
  

  const handleSeleccionHorario = (e) => {
    const nuevoHorario = e.target.value;
    setHorarioSeleccionado(nuevoHorario);
    onSeleccionarHorario(nuevoHorario);
  };

  return {
    horariosDisponibles,
    horarioSeleccionado,
    colaboradorSeleccionado,
    horariosOcupados,
    handleSeleccionHorario,
    
  };
};

export default useHorarioReservas;

