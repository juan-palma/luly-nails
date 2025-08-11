export const validarSoloLetrasEspacios = (valor) => {
    return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,}$/.test(valor);
  };


/**Que hace
 *  verifica que solo se ingrese texto
 *  Que no se ingrese un texto vacio
 *  Que el texto tenga un minimo de 3 caracteres
 *  Que el texto tenga un maximo de 50 caracteres
 *  Que el texto no contenga caracteres especiales
 *  Que el texto no contenga numeros
 *  
 */