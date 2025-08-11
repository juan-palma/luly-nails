import { useState, useEffect } from 'react';
import { ServicesAdmin } from '../../services/servicesAdmin';


const useColaboradorServicio = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setError(null);
      try {
        const colaboradoresData = await ServicesAdmin.obtenerColaboradores();
        //console.log("Colaboradores db ->",colaboradoresData)
        setColaboradores(colaboradoresData);
        const serviciosData = await ServicesAdmin.obtenerServicios();
        //console.log("Servicios db ->",serviciosData)
        setServicios(serviciosData);
      } catch (error) {
        console.log(error)
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleColaboradorChange = (event) => {
    setColaboradorSeleccionado(event.target.value);
  };

  const handleServicioChange = (event) => {
    setServicioSeleccionado(event.target.value);
  };

  return {
    colaboradores,
    servicios,
    colaboradorSeleccionado,
    servicioSeleccionado,
    loading,
    error,
    handleColaboradorChange,
    handleServicioChange,
  };
};

export default useColaboradorServicio;

