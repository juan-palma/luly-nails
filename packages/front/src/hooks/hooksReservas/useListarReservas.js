import { useState, useEffect } from 'react';
import { ServicesAdmin } from '../../services/servicesAdmin';

const useListarReservas = (mostrarMensajeError) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchReservas = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ServicesAdmin.obtenerReservas();
        console.log("Reservas", data);
        if (!data || !Array.isArray(data)) {
          console.error("La respuesta del backend es nula o indefinida.");
          const errorMessage = 'Hubo un problema al cargar la lista de turnos.';
          setError(errorMessage);
          mostrarMensajeError(errorMessage);
          return;
        }
    
        setReservas(data);
    
      } catch (error) {
        console.error("Error al obtener las reservas (desde el hook):", error);
        const errorMessage = 'Hubo un problema al cargar la lista de turnos. Por favor, intenta nuevamente más tarde.';
        setError(errorMessage);
        mostrarMensajeError(errorMessage, true); 
      } finally {
        setLoading(false);
      }
    };
    
    // const fetchReservas = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const response = await ServicesAdmin.obtenerReservas();
    //     //console.log(response);

    //     if (!response) {
    //       console.error("La respuesta del backend es nula o indefinida.");
    //       const errorMessage = 'Hubo un problema al cargar la lista de turnos.';
    //       setError(errorMessage);
    //       mostrarMensajeError(errorMessage);
    //       setLoading(false);
    //       return;
    //     }

    //     if (!response.ok) {
    //       let errorMessage = 'Hubo un problema al cargar la lista de turnos.';
    //       try {
    //         const errorData = await response.json();
    //         errorMessage = errorData.message || errorMessage;
    //       } catch (parseError) {
    //         console.error("Error al parsear la respuesta de error:", parseError);
    //       }
    //       setError(errorMessage);
    //       mostrarMensajeError(errorMessage);
    //       throw new Error(errorMessage); 
    //     }

    //     const data = await response.json();
    //     //console.log("Datos recibidos de obtenerReservas (desde el hook):", data);
    //     setReservas(data);

    //   } catch (error) {
    //     console.error("Error al obtener las reservas (desde el hook):", error);
    //     const errorMessage = 'Hubo un problema al cargar la lista de turnos. Por favor, intenta nuevamente más tarde.';
    //     setError(errorMessage);
    //     mostrarMensajeError(errorMessage, true); 
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchReservas();
  }, [mostrarMensajeError]);

  return {
    reservas,
    loading,
    error,
  };
};

export default useListarReservas;

