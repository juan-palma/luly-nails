import mongoose from "mongoose";

const servicioCollection = "servicios";

const servicioSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const serviciosModel = mongoose.model(servicioCollection, servicioSchema);

