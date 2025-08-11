import { serviciosModel } from "../models/servicios.model.js"
import { formatearPalabra } from "../utils/formatearPalabras.js"
import { validarSoloLetrasEspacios } from "../utils/validacionCamposInputs.js"

export class ServiciosController {

    static getServicios = async (req, res) => {
        //console.log(" getServicios", req.body)
        try {
            const servicios = await serviciosModel.find()
            //console.log("Servicios Obtenidos: ", servicios)
            res.status(200).json(servicios)
        } catch (error) {
            //console.error("Error al obtener servicios: ", error)
            res.status(500).json({message: "Server Error: Error al obtener servicios"})
        }
    }

    static createServicios = async (req, res) => {
        //console.log("Servicio recibido", req.body)
        try {
            const {name } = req.body
            //validacion basica
            if(!name ){
                // console.log("Error al crear servicio: Faltan datos")
                return res.status(400).json({message: "Error en el servidor al crear el servicio"})
            }
            // Validación en el backend: solo letras y espacios
            if (!validarSoloLetrasEspacios(name)) {
                return res.status(400).json({ message: "El nombre del servicio solo puede contener letras, espacios y mas de 3 letras." });
            } 
            
            const nombreFormateado = formatearPalabra(name.trim())

            const existingService = await serviciosModel.findOne({name: {$regex: new RegExp(`^${nombreFormateado}$`, 'i')}})
            if(existingService){
                // console.log("Error al crear servicio: El servicio ya existe")
                return res.status(409).json({message: `El servicio "${name}" ya existe`})
            }

            const newServicios = await serviciosModel.create( {name: nombreFormateado} )
            //console.log("Servicio creado: ", newServicios)
            res.status(200).json({message: "Servicio creado con éxito", newServicios})
        } catch (error) {
            //console.error("Error al crear servicio: ", error)
            if(error.name == "ValidationError"){
                //console.log("Error de validación", error.message)
                //se dispara en el front
                return res.status(400).json({message: "Error en la validacion. No es un servicio valido"})
            }else{
                //console.error("Error al crear servicio: ", error)
                res.status(500).json({message: "Server Error: Error al crear servicio"})
            }

        }
    }

    static getServicioId = async (req, res) => {
        // console.log("ID del servicio recibido: ", req.body)
        try {
            const id = req.params.id
            const servicio = await serviciosModel.findById(id)
            if(!servicio){
                // console.log("Error al obtener servicio: Servicio no encontrado")
                return res.status(404).json({message: "Servicio no encontrado"})
            }
            // console.log("Servicio encontrado: ", servicio)
            res.status(200).json({message: "Servicio encontrado", servicio})
        } catch (error) {
            //console.error(error)
            if(error.name === "CastError"){
                //console.log("Error al obtener servicio: ID no válido")
                return res.status(400).json({message: "Invalid ID format"})
            }
            //console.error("Error al obtener servicio: ", error)
            res.status(500).json({message: "Server Error: Error al obtener servicio"})
        }
    }

    static updateServicio = async (req, res) => {
        // console.log("ID del servicio recibido: ", req.body)
        try {
            const id = req.params.id
            const { name } = req.body

            if(!name || typeof name !== "string"){
                return res.status(400).json({message: "Nombre de servicio requerido y debe ser solo texto"})
            }

            if(!validarSoloLetrasEspacios(name)){
                return res.status(400).json({message: "Nombre de servicio solo puede contener letras"})
            }
            const nombreFormateado = formatearPalabra(name.trim())
            const servicioExistenete = await serviciosModel.findOne({
                name: { $regex: new RegExp(`^${nombreFormateado}$`, "i") },
                _id: { $ne: id }
            })
            // console.log("Servicio existente: ", servicioExistenete)
            if(servicioExistenete){
                // console.log("Error al actualizar servicio: Servicio con el mismo nombre ya existe")
                return res.status(400).json({message: "Servicio ya existe con ese nombre"})
            }

            const servicio = await serviciosModel.findByIdAndUpdate(
                id,
                {name: nombreFormateado},
                {new: true, runValidators: true}
            )
            // console.log("Servicio actualizado: ", servicio)
            if(!servicio){
                // console.log("Error al actualizar servicio: Servicio no encontrado")
               return res.status(404).json({message: "Servicio no encontrado"})
            }
            res.status(200).json({message: "Servicio actualizado", servicio})
        } catch (error) {
            //console.error(error)
            if(error.name == "ValidationError"){
                res.status(400).json({message: "Validacion error: Error al actualizar servicio: "+ error.message})
            }else if (error.name === "CastError"){
                return res.status(400).json({message: "Invalid ID format"})
            }
            res.status(500).json({message: "Server Error: Error al actualizar servicio"})
        }
    }

    static deleteServicio = async (req, res) => {
        // console.log("ID del servicio recibido: ", req.params.id)
        try {
            const id = req.params.id
            const servicio = await serviciosModel.findByIdAndDelete(id)
            // console.log("Servicio eliminado: ", servicio)
            if(!servicio){
                // console.log("Error al eliminar servicio: Servicio no encontrado")
                return res.status(404).json({message: "Servicio no encontrado"})
            }
            res.status(200).json({message: "Servicio eliminado"})
        } catch (error) {
           // console.error(error)
            if(error.name === "CastError"){
                return res.status(400).json({message: "Invalid ID format"})
            }
            res.status(500).json({message: "Server Error: Error al eliminar servicio"})
        }
    }
}

