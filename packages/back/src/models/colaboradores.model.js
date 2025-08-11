import mongoose from "mongoose";    

const colaboradoresCollection = "colaboradores";

const colaboradoresSchema = new mongoose.Schema({
    name: { type: String, required: true },
    service: { type: String, required: true } 
});

export const colaboradoresModel = mongoose.model(colaboradoresCollection, colaboradoresSchema);

