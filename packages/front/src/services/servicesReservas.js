//const API_URL = 'http://localhost:8080/api'; 
const API_URL = import.meta.env.VITE_API_URL;
//console.log(`::: Variable Global: ${API_URL}`);

export const crearReserva = async (reservaData) => {
 console.log(reservaData)
  try {
    const response = await fetch(`${API_URL}/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservaData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      throw new Error(errorData.message || 'Error al crear la reserva.');
    }

    const dataReserva = await response.json();
    //console.log("data reserva", dataReserva)
    return dataReserva;
  } catch (error) {
    console.error( error);
    throw error; 
  }
};

export const obtenerReservas = async () => {
  try {
    const response = await fetch(`${API_URL}/reservas`);
    console.log("Reservas", response);
    if (!response.ok) {
      throw new Error('Error al obtener las reservas');
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error en obtenerReservas:', error);
    throw error;
  }
};



export const ServicesReservas = {
    crearReserva,
    obtenerReservas,
}

