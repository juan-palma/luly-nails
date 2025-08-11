import { useState } from 'react';
import { ServicesReservas } from '../../services/servicesReservas';

const useConfirmacionReserva = (reservaData, onVolver, onCancelar, onConfirmarReservaCallback) => {
  const [confirmacionError, setConfirmacionError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [duplicado, setDuplicado] = useState(false);

  const handleConfirmarReservaInterno = async () => {
    setConfirmacionError('');
    setDuplicado(false);
    setIsConfirming(true);

    try {
      const reservaToSend = {
        name: reservaData.name,
        dni: reservaData.dni,
        collaborator: reservaData.collaborator,
        service: reservaData.service,
        date: reservaData.date,
        time: reservaData.time
      };


      const response = await ServicesReservas.crearReserva(reservaToSend);
      console.log(response);
      setIsConfirming(false);
      onConfirmarReservaCallback();
    } catch (error) {
      setIsConfirming(false);
    
      //console.error('Error al confirmar la reserva:', error);
    
      const mensaje = error?.response?.data?.message || error.message || 'Error desconocido';
      //los mensajes del includes provienen del back
      if (mensaje.includes('Ya existe un cliente registrado con ese DNI y servicio')) {
        setDuplicado(true); 
        setConfirmacionError('Ya tienes reservado un turno para este servicio en este mes.');
      } else if (mensaje.includes('El cliente ya tiene un turno reservado en ese horario')){
        setDuplicado(true);//hace que cambie el btn a cancelar
        setConfirmacionError('Ya tienes reservado un turno en este horario con otro servicio.');
      } else {
        setConfirmacionError('Hubo un error al confirmar la reserva. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return {
    confirmacionError,
    isConfirming,
    duplicado,
    handleConfirmarReservaInterno,
  };
};


export default useConfirmacionReserva;

