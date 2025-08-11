export const iniciarTemporizadorInactividad = (onInactivo, tiempo = 5 * 60 * 1000) => {
    let timerId;
  
    const resetTimer = () => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(onInactivo, tiempo);
    };
  
    const eventos = ['click', 'keydown', 'mousemove', 'touchstart'];
  
    eventos.forEach(evento => {
      window.addEventListener(evento, resetTimer);
    });
  
    // Iniciar temporizador por primera vez
    resetTimer();
  
    // Función de limpieza que se debe ejecutar al desmontar
    const limpiar = () => {
      if (timerId) clearTimeout(timerId);
      eventos.forEach(evento => {
        window.removeEventListener(evento, resetTimer);
      });
    };
  
    return limpiar;
  };
  