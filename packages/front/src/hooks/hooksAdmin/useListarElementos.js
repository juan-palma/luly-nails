import { useState, useEffect, useCallback } from 'react';
import { ServicesAdmin } from '../../services/servicesAdmin';

const useListarElementos = (tipo, mostrarMensajeError) => {
  const [elementos, setElementos] = useState(() => {
    const almacenados = localStorage.getItem(`elementos_${tipo}`);
    return almacenados ? JSON.parse(almacenados) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actualizandoId, setActualizandoId] = useState(null);
  const [mensajeExitoActualizacion, setMensajeExitoActualizacion] = useState('');
  const [mensajeExitoEliminacion, setMensajeExitoEliminacion] = useState('');
  const [mensajeErrorEliminacion, setMensajeErrorEliminacion] = useState('');

  const CARGA_DELAY = 300;
  const MENSAJE_TIMEOUT = 3000;

  const cargarElementos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, CARGA_DELAY));
      let data;
      if (tipo === 'servicio') {
        data = await ServicesAdmin.obtenerServicios();
      } else if (tipo === 'colaborador') {
        data = await ServicesAdmin.obtenerColaboradores();
      }
      setElementos(data);
      localStorage.setItem(`elementos_${tipo}`, JSON.stringify(data));
    } catch (err) {
      console.error("Error en cargarElementos:", err);
      setError(err.message || 'Error al cargar los elementos.');
      mostrarMensajeError(err.message || 'Error al cargar los elementos.');
    } finally {
      setLoading(false);
    }
  }, [tipo, mostrarMensajeError]);

  const handleEliminar = useCallback(async (id) => {
    setLoading(true);
    setMensajeExitoEliminacion('');
    setMensajeErrorEliminacion('');
    try {
      let resultado;
      if (tipo === 'servicio') {
        resultado = await ServicesAdmin.eliminarServicio(id);
      } else if (tipo === 'colaborador') {
        resultado = await ServicesAdmin.eliminarColaborador(id);
      }
      if (resultado?.message) {
        setMensajeExitoEliminacion(`Se ha eliminado el ${tipo} con éxito.`);
        cargarElementos();
        setTimeout(() => {
          setMensajeExitoEliminacion('');
        }, MENSAJE_TIMEOUT);
      } else if (resultado?.error) {
        setMensajeErrorEliminacion(resultado.error || `Error al eliminar el ${tipo}.`);
        setTimeout(() => {
          setMensajeErrorEliminacion('');
        }, MENSAJE_TIMEOUT);
      }
    } catch (err) {
      setMensajeErrorEliminacion(err.message || `Error al eliminar el ${tipo}.`);
      setTimeout(() => {
        setMensajeErrorEliminacion('');
      }, MENSAJE_TIMEOUT);
    } finally {
      setLoading(false);
    }
  }, [tipo, cargarElementos, mostrarMensajeError]);

  const handleActualizarElemento = useCallback(async (id, datosActualizados, setErrorModal) => {
    setActualizandoId(id);
    setErrorModal(''); 
    try {
      let resultado;
      if (tipo === 'servicio') {
        resultado = await ServicesAdmin.actualizarServicio({ _id: id, ...datosActualizados });
      } else if (tipo === 'colaborador') {
        resultado = await ServicesAdmin.actualizarColaborador({ _id: id, ...datosActualizados });
      }

      if (resultado?.message) {
        setMensajeExitoActualizacion(`Se ha actualizado el ${tipo} con éxito.`);
        setTimeout(() => {
          setMensajeExitoActualizacion('');
        }, MENSAJE_TIMEOUT);
        await cargarElementos();
        setActualizandoId(null);
        return true;
      } else if (resultado?.error) {
        setErrorModal(resultado.error); 
        setActualizandoId(null);
        return false;
      } else {
        setErrorModal('Error desconocido al actualizar.');
        setActualizandoId(null);
        return false;
      }
    } catch (err) {
      console.error("Error al actualizar elemento:", err);
      setErrorModal(`Ocurrió un problema al actualizar el ${tipo}.`);
      setActualizandoId(null);
      return false;
    }
  }, [tipo, cargarElementos]);

  useEffect(() => {
    cargarElementos();
  }, [tipo, cargarElementos]);

  return {
    elementos,
    loading,
    error,
    handleEliminar,
    actualizandoId,
    mensajeExitoActualizacion,
    handleActualizarElemento,
    mensajeExitoEliminacion,
    mensajeErrorEliminacion,
  };
};

export default useListarElementos;
