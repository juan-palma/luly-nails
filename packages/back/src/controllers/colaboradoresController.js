import { colaboradoresModel } from "../models/colaboradores.model.js"
import { serviciosModel } from "../models/servicios.model.js"
import { formatearPalabra } from "../utils/formatearPalabras.js"
import { validarSoloLetrasEspacios } from "../utils/validacionCamposInputs.js"

export class colaboradoresController {
    
    static getColaboradores = async (req, res) => {
      //console.log("getColaboradores", req.body)
        try {
            const colaboradores = await colaboradoresModel.find()
            console.log(" Colaboradores Obtenidos: ", colaboradores)
            res.status(200).json(colaboradores)
        } catch (error) {
            console.error("Error al obtener colaboradores: ", error)
            res.status(500).json({ message: "Server error: Error al obtener colaboradores" })
        }
    }
    
    static createColaborador = async (req, res) => {
      //console.log("createColaborador", req.body);

      try {
        const { name, service } = req.body;
    
        // Validación básica de los inputs
        if (!name || !service) {
          console.log("Los campos llegan vacios desde el front en createColaborador, algun error de logica")
          //puse este mensaje para que sea mas intuitivo al cliente porque no encontre como hacerlo de otra manera
          return res.status(400).json({ message: "Error en el servidor al intentar crear colaborador" });
        }
        if(!validarSoloLetrasEspacios(name.trim()) || !validarSoloLetrasEspacios(service.trim())){
          return res.status(400).json({message: "El nombre debe contener solo letras, espacios y tener más de 3 letras."});
        }
        //formateo
        const nombreFormateado = formatearPalabra(name.trim());
        const servicioFormateado = formatearPalabra(service.trim());
    
        const serviciosValidos = await serviciosModel.find().distinct("name")
        //console.log("Servicio validos : ", serviciosValidos)
        if(!serviciosValidos.map(service => formatearPalabra(service)).includes(servicioFormateado)){
          //console.log("servicio que incluye ", serviciosValidos)//son disparados al front
          return res.status(400).json({message: `Servicio no válido, debe ser ${serviciosValidos.join(', ')}`});
        }
        // Crear colaborador con datos formateados
        const colaborador = await colaboradoresModel.create({
          name: nombreFormateado,
          service: servicioFormateado,
        });
        //console.log("Colaborador creado: ", colaborador);
        res.status(201).json(colaborador);
    
      } catch (error) {
        console.error("Error al crear colaborador: ", error);
        //valido si el error es de tipo duplicate key
        if (error.name === "ValidationError") {
          return res.status(400).json({ message: "Validation error: " + error.message });
        }
        return res.status(500).json({ message: "Server error: Error al crear colaborador" });
      }
    };
    

    static getcolaboradorById = async (req, res) => {
        //console.log('Colaborador ID:', req.params.id);
        try {
            const id = req.params.id
            const colaborador = await colaboradoresModel.findById(id)
            //console.log("Colaborador encontrado: ", colaborador);
            if(!colaborador){
                //console.log("Colabordor no encontrado")
                return res.status(404).json({ message: "Colaborador no encontrado" })
            }
            res.status(200).json("Colaborador obtenido con exito")
        } catch (error) {
            if( error.name === "CastError" ){
               // console.log(" Error de tipo CastError", error)
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            //console.error("Error al obtener colaborador: ", error)
            res.status(500).json({ message: "Server error: Error al obtener colaborador"})
        }
    }

    static updateColaborador = async (req, res) => {
      //console.log(" update colaborador", req.body)
      try {
        const { name, service } = req.body
  
        if (!name || !service) {
          console.log( "Todos los campos son obligatorios para actualizar el colaborador.")
          // coloque este mensaje mas amigale al usuario por que no encontre otra manera de hacerlo
          return res.status(400).json({ message: "Ocurrio un error al actualizar el colaborador, Comuniquese con el administrador" })
        }
  
        if (!validarSoloLetrasEspacios(name.trim()) || !validarSoloLetrasEspacios(service.trim())) {
          //console.log(" El nombre y el servicio deben ser solo letras y espacios", name, service)
          return res.status(400).json({ message: "El nombre y el servicio deben contener solo letras, espacios y al menos 3 caracteres." })
        }
  
        const nombreFormateado = formatearPalabra(name.trim())
        const servicioFormateado = formatearPalabra(service.trim())
  
        const serviciosValidos = await serviciosModel.find().distinct("name")
        const serviciosFormateados = serviciosValidos.map(s => formatearPalabra(s))
  
        if (!serviciosFormateados.includes(servicioFormateado)) {
          //console.log(" El servicio no existe en la base de datos", servicioFormateado)
          return res.status(400).json({ message: `Servicio no válido. Debe ser uno de: ${serviciosValidos.join(', ')}` })
        }
  
        const colaborador = await colaboradoresModel.findByIdAndUpdate(
          req.params.id,
          { name: nombreFormateado, service: servicioFormateado },
          { new: true, runValidators: true }
        )
        // console.log("Colaborador actualizado: ", colaborador)
        if (!colaborador) {
          //console.log("Colaborador no encontrado")
          return res.status(404).json({ message: "Colaborador no encontrado." })
        }
  
        res.status(200).json({ message: "Colaborador actualizado con éxito", colaborador })
      } catch (error) {
        //console.error("Error al actualizar colaborador: ", error)
        if (error.name === "ValidationError") {
          return res.status(400).json({ message: "Error de validación: " + error.message })
        }
        if (error.name === "CastError") {
          return res.status(400).json({ message: "ID inválido." })
        }
        res.status(500).json({ message: "Error interno al actualizar colaborador." })
      }
    }
    static deleteColaborador = async (req, res) => {
       // console.log("ID del colaborador a eliminar: ", req.params.id)
        try {
            const colaborador = await colaboradoresModel.findByIdAndDelete(req.params.id);
            if (!colaborador) {
              return res.status(404).json({ message:'Colaborador no encontrado' });
            }
            res.status(200).json({ message: 'Colaborador eliminado con exito' });
          } catch (error) {
            //console.error(error); 
            if (error.name === 'CastError') {
              return res.status(400).json({ message: 'Invalid ID format' });
            }
            res.status(500).json({ message: 'Server error: fallo al eliminar colaborador' });
          }
    }


}

