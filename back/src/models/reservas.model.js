import mongoose from "mongoose";

const reservasCollection = "reservas";

const reservasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true
  },
  collaborator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'colaboradores',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
  },
})

export const reservasModel = mongoose.model(reservasCollection, reservasSchema);




