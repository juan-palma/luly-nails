
export const formatearPalabra = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
};

/** Que hace
 *  Formatea una palabra para que comience con mayúscula y el resto en min
 *  chart At(0) devuelve el primer caracter de la palabra
 *  toUpperCase () convierte el caracter en mayúscula
 *  slice (1) devuelve el resto de la palabra
 *  toLowerCase () convierte el resto de la palabra en minúscula
 */