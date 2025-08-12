import mongoose from "mongoose";
import { loadEnv } from './loadEnv.js';
loadEnv(['MONGO_DB']);

const URL = process.env.MONGO_DB

export const connectDB = async () => {
    
    try {
        await mongoose.connect(URL)
        console.log("Conectado a la base de datos")
    } catch (error) {
        console.log("Error al conectar a la base de datos", error.message)
    }
}

