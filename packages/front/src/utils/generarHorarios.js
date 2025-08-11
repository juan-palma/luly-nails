// Podés reemplazar esta función por una llamada real a la API más adelante
export const generarHorarios = () => {
    const horarios = [];
    let hora = 9;
    let minuto = 0;
  
    while (hora < 20) {
      const horaStr = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
  
      // Saltar el bloque entre 12:01 y 14:29
      const totalMinutos = hora * 60 + minuto;
      if (totalMinutos > 720 && totalMinutos < 870) { // entre 12:00 y 14:30
        hora = 14;
        minuto = 30;
        continue;
      }
  
      horarios.push(horaStr);
  
      // Avanzar 90 minutos
      minuto += 90;
      if (minuto >= 60) {
        hora += Math.floor(minuto / 60);
        minuto = minuto % 60;
      }
    }
  
    return horarios;
  };
  