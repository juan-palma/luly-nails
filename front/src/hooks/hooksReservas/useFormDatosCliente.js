import { useState, useEffect } from 'react';
import { validarSoloLetrasEspacios } from '../../utils/validarPalabras';
import { validarSoloNumeros } from '../../utils/validarSoloNumeros';
import { ServicesReservas } from '../../services/servicesReservas';


const useFormDatosCliente = () => {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [errores, setErrores] = useState({});
  const [reservaExiste, setReservaExiste] = useState([]);
  const [cargandoReserva, setCargandoReserva] = useState(false);

  const validarCampo = (name, value) => {
    const nuevosErrores = { ...errores };
    if (name === 'nombre') {
      if (!value.trim()) {
        nuevosErrores.nombre = 'El nombre es requerido.';
      } else if (!validarSoloLetrasEspacios(value)) {
        nuevosErrores.nombre = 'El nombre solo puede contener letras, más de 3 letras y espacios.';
      } else {
        delete nuevosErrores.nombre;
      }
    } else if (name === 'dni') {
      if (!value.trim()) {
        nuevosErrores.dni = 'El DNI es requerido.';
      } else if (!validarSoloNumeros(value)) {
        nuevosErrores.dni = 'El DNI solo puede contener números.';
      } else if (value.length < 7 || value.length > 8) {
        nuevosErrores.dni = 'El DNI debe tener entre 7 y 8 números.';
      } else {
        delete nuevosErrores.dni;
      }
    }
    return nuevosErrores;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let nuevosErrores = { ...errores };
    if (name === 'nombre') {
      setNombre(value);
      nuevosErrores = validarCampo(name, value);
    } else if (name === 'dni') {
      setDni(value);
      nuevosErrores = validarCampo(name, value);
    }
    setErrores(nuevosErrores);
  };

  const validarFormulario = () => {
    const erroresNombre = validarCampo('nombre', nombre);
    const erroresDni = validarCampo('dni', dni);
    const erroresFinales = { ...erroresNombre, ...erroresDni };
    setErrores(erroresFinales);
    return Object.keys(erroresFinales).length === 0;
  };

  useEffect(() => {
    const buscarReserva = async () => {
      if (dni.trim().length >= 6) {
        setCargandoReserva(true);
        try {
          const reservas = await ServicesReservas.obtenerReservas()
          //console.log("Reservas Agendadas",reservas)
          const ahora = new Date();
          const mesActual = ahora.getMonth();
          const anioActual = ahora.getFullYear();

          const encontradas = reservas.filter((r) => {
            const fecha = new Date(r.date);
            const mismaPersona = String(r.dni) === String(dni);
            const esDelMes = fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
            return mismaPersona && esDelMes;
          });

          //console.log('Reservas encontradas:', encontradas);
          setReservaExiste(encontradas);
          //console.log(reservaExiste)
        } catch (error) {
          console.error('Error al buscar reserva existente', error);
          setReservaExiste(null);
        } finally {
          setCargandoReserva(false);
        }
      } else {
        setReservaExiste(null);
      }
    };

    buscarReserva();
  }, [dni]);

  return {
    nombre,
    dni,
    errores,
    handleInputChange,
    validarFormulario,
    reservaExiste,
    setReservaExiste,
    cargandoReserva,
    validarCampo
  };
};

export default useFormDatosCliente;

