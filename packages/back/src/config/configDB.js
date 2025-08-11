import mongoose from "mongoose";
//import dotenv from "dotenv";
//dotenv.config()
import { loadEnv } from '../../../config/loadEnv.js';
loadEnv(['MONGO_DB']);

const URL = process.env.MONGO_DB
//console.log(`::: Variable Global DB: ${URL}`);

export const connectDB = async () => {
    
    try {
        await mongoose.connect(URL)
        console.log("Conectado a la base de datos")
    } catch (error) {
        console.log("Error al conectar a la base de datos", error.message)
    }
}

