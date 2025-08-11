export const formatearPalabra = (nombre) => {
    return nombre
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  };
  

//   Qué hace:

//   trim() limpia espacios al principio y final.

//   toLowerCase() pone todo en minúsculas.

//   replace(/\s+/g, ' ') limpia múltiples espacios entre palabras.

//   split(' ') divide por palabra.

//   map() capitaliza cada palabra (útil para nombres compuestos como "juan perez").

//   join(' ') vuelve a unirlas.