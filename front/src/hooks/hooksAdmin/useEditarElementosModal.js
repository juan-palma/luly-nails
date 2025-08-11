import { useState, useEffect } from 'react';
import { ServicesAdmin } from '../../services/servicesAdmin';

const useEditarElementosModal = ({ tipo, elemento, onElementoActualizado, onHide }) => {
  const [nombre, setNombre] = useState('');
  const [servicio, setServicio] = useState('');
  const [loading, setLoading] = useState(false);
  const [erroresValidacion, setErroresValidacion] = useState({});
  const [errorApi, setErrorApi] = useState('');
  const [actualizacionExitosaLocal, setActualizacionExitosaLocal] = useState(false); 

  useEffect(() => {
    if (elemento) {
      setNombre(elemento.name || '');
      setServicio(tipo === 'colaborador' ? elemento.service || '' : '');
      setErroresValidacion({});
      setErrorApi('');
      setActualizacionExitosaLocal(false); 
    }
  }, [elemento, tipo]);

  const validarFormulario = () => {
    const errores = {};
    if (!nombre.trim()) {
      errores.nombre = 'El nombre es requerido.';
    } else if (nombre[0] !== nombre[0].toUpperCase()) {
      errores.nombre = 'La primera letra debe ser mayúscula.';
    }

    if (tipo === 'colaborador') {
      if (!servicio.trim()) {
        errores.servicio = 'El servicio es requerido.';
      } else if (servicio[0] !== servicio[0].toUpperCase()) {
        errores.servicio = 'La primera letra del servicio debe ser mayúscula.';
      }
    }

    setErroresValidacion(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorApi('');
    setActualizacionExitosaLocal(false);

    if (!validarFormulario()) {
      setLoading(false);
      return;
    }

    const datosActualizados = {
      _id: elemento._id,
      name: nombre,
    };

    if (tipo === 'colaborador') {
      datosActualizados.service = servicio;
    }

    try {
      let resultado;
      if (tipo === 'servicio') {
        resultado = await ServicesAdmin.actualizarServicio(datosActualizados);
      } else {
        resultado = await ServicesAdmin.actualizarColaborador(datosActualizados);
      }

      if (resultado?.error) {
        setErrorApi(resultado.error);
        return;
      }

      if (resultado?.message) {
        setActualizacionExitosaLocal(true); // Indica éxito localmente
        onElementoActualizado(resultado.elementoActualizado || datosActualizados);
        onHide(); // Cerramos el modal solo si fue exitoso
      } else {
        setErrorApi(`No se pudo actualizar el ${tipo}`);
      }
    } catch (err) {
      setErrorApi(err.message || `Error al actualizar ${tipo}.`);
    } finally {
      setLoading(false);
    }
  };

  return {
    nombre,
    setNombre,
    servicio,
    setServicio,
    erroresValidacion,
    errorApi,
    loading,
    handleSubmit,
    actualizacionExitosaLocal,
  };
};

export default useEditarElementosModal;