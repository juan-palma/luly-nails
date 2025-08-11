import mongoose from "mongoose"; 
import { reservasModel } from "../models/reservas.model.js";
import moment from 'moment-timezone';
import { formatearPalabra } from "../utils/formatearPalabras.js";

export class ReservasController {

  static getReservas = async (req, res) => {
    try {
      const reservas = await reservasModel.find()
        .populate('collaborator', 'name')
        .sort({date: 1})

      res.status(200).json(reservas);
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      res.status(500).json({ message: "Error al obtener las reservas.", error: error.message });
    }
  };

  static createReservas = async (req, res) => {
    try {
      const { name, dni, service, collaborator, date, time } = req.body;
      console.log("Datos ->", req.body);

      const fechaReserva = moment.tz(date, 'America/Argentina/Buenos_Aires');

      const startOfMonth = fechaReserva.clone().startOf('month').toDate();
      const endOfMonth = fechaReserva.clone().endOf('month').toDate();

      const serviceFormateado = formatearPalabra(service);
      const nameFormateado = formatearPalabra(name);

      // 🔒 Validación 1: que no tenga el mismo servicio en el mismo mes
      const reservaDuplicadaMes = await reservasModel.findOne({
        dni: dni,
        service: serviceFormateado,
        date: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        }
      });

      if (reservaDuplicadaMes) {
        return res.status(409).json({ 
          message: "Ya existe un cliente registrado con ese DNI y servicio en este mes.",
          code: "RESERVA_DUPLICADA_MES"
        });
      }

      // 🔒 Validación 2: que no tenga otra reserva en el mismo día y horario
      const mismaFecha = fechaReserva.clone().startOf('day').toDate();
      const diaSiguiente = fechaReserva.clone().add(1, 'day').startOf('day').toDate();

      const reservaEnMismoHorario = await reservasModel.findOne({
        dni: dni,
        date: { $gte: mismaFecha, $lt: diaSiguiente },
        time: time
      });

      if (reservaEnMismoHorario) {
        return res.status(409).json({ 
          message: "El cliente ya tiene un turno reservado en ese horario.",
          code: "RESERVA_MISMO_HORARIO"
        });
      }

      const nuevaReserva = await reservasModel.create({
        name: nameFormateado,
        dni,
        service: serviceFormateado,
        collaborator,
        date,
        time
      });

      //console.log("Nueva reserva ->", nuevaReserva);
      res.status(201).json({ message: "Reserva creada.", cliente: nuevaReserva });

    } catch (error) {
      console.error("Error al crear la reserva:", error);
      res.status(500).json({ message: "Error al crear la reserva.", error: error.message });
    }
  };

  static eliminarReserva = async (req, res) => {
    //console.log(req.params)
    try {
      const { id } = req.params;
      //console.log(id)
      const reservaEliminada = await reservasModel.findByIdAndDelete(id);
  
      if (!reservaEliminada) {
        return res.status(404).json({ message: "Reserva no encontrada." });
      }
  
      res.status(200).json({ message: "Reserva eliminada exitosamente." });
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      res.status(500).json({ message: "Error al eliminar la reserva.", error: error.message });
    }
  };
 // por ahora no se usa
  static editarReserva = async (req, res) => {
    //console.log()
    try {
      const { id } = req.params;
      const { name, dni, service, collaborator, date, time } = req.body;
  
      const serviceFormateado = formatearPalabra(service);
      const nameFormateado = formatearPalabra(name);
  
      const reservaActualizada = await reservasModel.findByIdAndUpdate(
        id,
        {
          name: nameFormateado,
          dni,
          service: serviceFormateado,
          collaborator,
          date,
          time
        },
        { new: true } // ← para que devuelva la reserva actualizada
      );
  
      if (!reservaActualizada) {
        return res.status(404).json({ message: "Reserva no encontrada." });
      }
  
      res.status(200).json({ message: "Reserva actualizada exitosamente.", reserva: reservaActualizada });
    } catch (error) {
      console.error("Error al editar la reserva:", error);
      res.status(500).json({ message: "Error al editar la reserva.", error: error.message });
    }
  };
    

}

