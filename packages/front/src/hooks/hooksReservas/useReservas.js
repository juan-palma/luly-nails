import { useState, useEffect } from 'react';
import { iniciarTemporizadorInactividad } from '../../utils/detectarInactividad';

const useReservas = () => {
  const [currentSection, setCurrentSection] = useState(() => {
    const storedSection = localStorage.getItem('reservaSection');
    const validSections = ['introduccion', 'formulario-datos', 'colaborador-servicio', 'calendario-reserva', 'confirmacion-reserva', 'reserva-exitosa'];
    return storedSection && validSections.includes(storedSection) ? storedSection : 'introduccion';
  });
  const [reservaData, setReservaData] = useState(() => {
    const storedReservaData = localStorage.getItem('reservaData');
    return storedReservaData ? JSON.parse(storedReservaData) : {};
  });

  //console.log(reservaData)
  useEffect(() => {
    const limpiarInactividad = iniciarTemporizadorInactividad(()=>{
      setReservaData({})
      setCurrentSection('introduccion')
      localStorage.removeItem('reservaSelection')
      localStorage.removeItem('reservaData')
    }, 5 * 60 *1000)

    localStorage.setItem('reservaSection', currentSection);

    return () => limpiarInactividad()
  }, [currentSection]);

  useEffect(() => {
    localStorage.setItem('reservaData', JSON.stringify(reservaData));
  }, [reservaData]);

  const handleSiguiente = (data, nextSection) => {
    //console.log(data)
    setReservaData(prevData => ({ ...prevData, ...data }));
    if (nextSection) {
      setCurrentSection(nextSection);
    } else if (currentSection === 'introduccion') {
      setCurrentSection('formulario-datos');
    } else if (currentSection === 'formulario-datos') {
      setCurrentSection('colaborador-servicio');
    } else if (currentSection === 'colaborador-servicio') {
      setCurrentSection('calendario-reserva'); 
    } else if (currentSection === 'calendario-reserva') {
      setCurrentSection('confirmacion-reserva');
    }
  };

  const handleVolver = () => {
    if (currentSection === 'formulario-datos') {
      setCurrentSection('introduccion');
    } else if (currentSection === 'colaborador-servicio') {
      setCurrentSection('formulario-datos');
    } else if (currentSection === 'calendario-reserva') {
      setCurrentSection('colaborador-servicio'); 
    } else if (currentSection === 'confirmacion-reserva') {
      setCurrentSection('calendario-reserva'); 
    }
  };

  return {
    currentSection,
    reservaData,
    setCurrentSection,
    setReservaData,
    handleSiguiente,
    handleVolver,
  };
};

export default useReservas;

