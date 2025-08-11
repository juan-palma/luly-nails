import { useState } from 'react';
import { ServicesAdmin } from '../../services/servicesAdmin';
import { validarSoloLetrasEspacios } from '../../utils/validarPalabras';

const useCrearElemento = (tipo, onElementCreated, onElementError) => {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [loading, setLoading] = useState(false);
  const [erroresValidacion, setErroresValidacion] = useState({});

  const validarInput = (value) => {
    return validarSoloLetrasEspacios(value) && value.trim().length > 3;
  };

  const handleInputChange = (e, setter, fieldName) => {
    const newValue = e.target.value;
    setter(newValue);

    if (!validarSoloLetrasEspacios(newValue)) {
      setErroresValidacion(prevErrores => ({ ...prevErrores, [fieldName]: 'Solo permite letras y espacios.' }));
    } else if (newValue.trim().length <= 3) {
      setErroresValidacion(prevErrores => ({ ...prevErrores, [fieldName]: 'Debe tener más de 3 letras.' }));
    } else if (erroresValidacion[fieldName]) {
      setErroresValidacion(prevErrores => {
        const { ...rest } = prevErrores;
        delete rest[fieldName]; 
        return rest;
      });
    }
  };

  const validarCampos = () => {
    let valid = true;
    const errores = {};

    if (!name.trim()) {
      errores.name = 'El nombre es requerido.';
      valid = false;
    } else if (!validarInput(name)) {
      if (!validarSoloLetrasEspacios(name)) {
        errores.name = 'Solo se permiten letras y espacios.';
      } else if (name.trim().length <= 3) {
        errores.name = 'El nombre debe tener más de 3 letras.';
      }
      valid = false;
    }

    if (tipo === 'colaborador') {
      if (!service.trim()) {
        errores.service = 'El servicio es requerido.';
        valid = false;
      } else if (!validarInput(service)) {
        if (!validarSoloLetrasEspacios(service)) {
          errores.service = 'Solo se permiten letras y espacios.';
        } else if (service.trim().length <= 3) {
          errores.service = 'El servicio debe tener más de 3 letras.';
        }
        valid = false;
      }
    }

    setErroresValidacion(errores);
    return valid;
  };

  const crear = async () => {
    if (!validarCampos()) {
      if (onElementError) {
        onElementError("Por favor, corrija los errores en el formulario.");
      }
      return;
    }

    setLoading(true);

    try {
      let resultado;
      if (tipo === 'servicio') {
        resultado = await ServicesAdmin.crearServicio({ name: name });
      } else if (tipo === 'colaborador') {
        resultado = await ServicesAdmin.crearColaborador({ name: name, service: service });
      }

      setName('');
      setService('');
      setErroresValidacion({});
      if (onElementCreated) {
        onElementCreated(resultado);
      }
    } catch (err) {
      if (onElementError) {
        onElementError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    service,
    setService,
    loading,
    erroresValidacion,
    crear,
    handleInputChange,
  };
};

export default useCrearElemento;


