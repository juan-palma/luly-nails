//const API_URL = 'http://localhost:8080/api';
const API_URL = import.meta.env.VITE_API_URL;
//console.log(`::: Variable Global: ${API_URL}`);

export const crearServicio = async (servicioData) => {
  //console.log(" Servicio a crear: ", servicioData);
  try {
    const response = await fetch(`${API_URL}/servicios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servicioData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      //console.log(" Error al crear servicio: ", errorData);
      throw new Error(errorData.message || 'Error al crear el servicio');
    }
    const servicioCreado = await response.json();
    // console.log(servicioCreado);
    return servicioCreado
  } catch (error) {
    console.error('Error al crear servicio:', error);
    throw error;
  }
};

export const crearColaborador = async (colaboradorData) => {
  //console.log("Data ", colaboradorData ); // recibo un objeto
  try {
    const response = await fetch(`${API_URL}/colaboradores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( colaboradorData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      //console.log("error data", errorData);//proviene del back
      throw new Error(errorData.message || 'Error al crear el colaborador');
    }
    const colaboradorCreado = await response.json();
    //console.log("data", colaboradorCreado);
    return colaboradorCreado
  } catch (error) {
    //mensaje proviene del back
    console.error('Error al crear colaborador:', error);
    throw error;
  }
};

export const obtenerServicios = async () => {
  // console.log("Obteniendo servicios");
  try {
    const response = await fetch(`${API_URL}/servicios`);

    if (!response.ok) {
      const errorData = await response.json();
      //console.log("Error obtener servicios", errorData);
      throw new Error(errorData.message || 'Error al obtener los servicios');
    }
    const dataServicios = await response.json();
    //console.log("Servicios obtenidos", dataServicios);
    return dataServicios
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    throw error;
  }
}

export const obtenerColaboradores = async () => {
  // console.log("Obteniendo colaboradores");
  try {
    const response = await fetch(`${API_URL}/colaboradores`);
    if (!response.ok) {
      const errorData = await response.json();
      //console.log("Error obtener colaboradores", errorData);
      throw new Error(errorData.message || 'Error al obtener los colaboradores');
    }
    const dataColaboradores = await response.json();
    //console.log("Colaboradores obtenidos", dataColaboradores);
    return dataColaboradores
  } catch (error) {
    console.error('Error al obtener colaboradores:', error);
    throw error;
  }
}

const eliminarServicio = async (id) => {
  // console.log("Eliminando servicio", id);
  try {
    const response = await fetch(`${BASE_URL}/servicios/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    //console.log("Servicio eliminado", data);
    if (!response.ok) {
      // console.log("Error eliminar servicio", data.message);
      throw new Error(data.message || `Error al eliminar el servicio con ID: ${id}`);
    }
    //console.log("Servicio eliminado", data);
    return data; // Espera un mensaje de éxito del backend
  } catch (error) {
    //console.error(`Error al eliminar servicio con ID ${id}:`, error);
    return { error: error.message || `Error al eliminar el servicio con ID: ${id}` };
  }
};

const eliminarColaborador = async (id) => {
  // console.log("Eliminando colaborador", id);
  try {
    const response = await fetch(`${BASE_URL}/colaboradores/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    //console.log("Colaborador eliminado", data);
    if (!response.ok) {
      // console.log("Error eliminar colaborador", data.message);
      throw new Error(data.message || `Error al eliminar el colaborador con ID: ${id}`);
    }
    //console.log("Colaborador eliminado", data);
    return data; // Espera un mensaje de éxito del backend
  } catch (error) {
    //console.error(`Error al eliminar colaborador con ID ${id}:`, error);
    return { error: error.message || `Error al eliminar el colaborador con ID: ${id}` };
  }
};

const actualizarServicio = async (servicioData) => {
  // console.log("Actualizando servicio", servicioData);
  try {
    const response = await fetch(`${API_URL}/servicios/${servicioData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servicioData),
    });
    const data = await response.json();
    //console.log("Servicio actualizado", data);
    if (!response.ok) {
      // console.log("Error actualizar servicio", data.message);
      throw new Error(data.message || `Error al actualizar el servicio con ID: ${servicioData._id}`);
    }
    return { message: 'Servicio actualizado con éxito', elementoActualizado: data };
  } catch (error) {
    //console.error(`Error al actualizar servicio con ID ${servicioData._id}:`, error);
    return { error: error.message || `Error al actualizar el servicio con ID: ${servicioData._id}` };
  }
};

const actualizarColaborador = async (colaboradorData) => {
  // console.log("Actualizando colaborador", colaboradorData);
  try {
    const response = await fetch(`${API_URL}/colaboradores/${colaboradorData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colaboradorData),
    });
    const data = await response.json();
    //console.log("Colaborador actualizado", data);
    if (!response.ok) {
      // console.log("Error actualizar colaborador", data.message);
      throw new Error(data.message || `Error al actualizar el colaborador con ID: ${colaboradorData._id}`);
    }
    return { message: 'Colaborador actualizado con éxito', elementoActualizado: data };
  } catch (error) {
    //console.error(`Error al actualizar colaborador con ID ${colaboradorData._id}:`, error);
    return { error: error.message || `Error al actualizar el colaborador con ID: ${colaboradorData._id}` };
  }
};

const obtenerReservas = async () => {
  try {
    const response = await fetch(`${API_URL}/reservas`);
    const data = await response.json()
    if (!response.ok) {
      // No intentes parsear el JSON aquí, solo lanza el error
      let errorMessage = 'Error al obtener la lista de reservas.';
      try {
        const errorData = await response.json();
        console.log("Error",errorData)
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        console.error("Error al parsear la respuesta de error en el service:", parseError);
      }
      throw new Error(errorMessage);
    }
    return data; 
  } catch (error) {
    console.error('Error al obtener la lista de reservas en el service:', error);
    throw error;
  }
};

const eliminarReserva = async (id) => {
  console.log(id)
  try {
    const response = await fetch(`${API_URL}/reservas/${id}`, {
      method: "DELETE"
    });
    
    let data;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Respuesta no es un JSON válido", error);
    }
    
    if (!response.ok) {
      throw new Error(data?.message || "Error al eliminar la reserva");
    }
    
    return data;

  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    throw error;
  }
}
// la cree pero por el momento no la uso
const actualizarReserva = async (reservaData) => {
  try {
    const response = await fetch(`${API_URL}/reservas/${reservaData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservaData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error al actualizar la reserva`);
    }
    return { message: 'Reserva actualizada con éxito', elementoActualizado: data };
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    throw error;
  }
};

export const ServicesAdmin = {
    crearServicio,
    crearColaborador,
    obtenerServicios,
    obtenerColaboradores,
    eliminarServicio,
    eliminarColaborador,
    actualizarServicio,
    actualizarColaborador,
    obtenerReservas,
    eliminarReserva,
    actualizarReserva
}

