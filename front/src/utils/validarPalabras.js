export const validarSoloLetrasEspacios = (valor) => {
    return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,}$/.test(valor);
  };

  /*Que hace:
  
  *   - Recibe un valor
  *   - Verifica si el valor contiene solo letras y espacios
  *   - Si el valor contiene solo letras y espacios, devuelve true
  */