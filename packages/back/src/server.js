// import express from 'express';
// import cors from 'cors';
// import { connectDB } from './config/configDB.js';
// import { serviciosRouter } from './routes/servicio.routes.js';
// import { colaboradoresRouter } from './routes/colaboradores.routes.js';
// import reservasRouter from './routes/reservas.routes.js';
// import { errorHandler } from './middlewares/errorMiddleware.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// console.log("🌍 FRONTEND_URL en backend:", process.env.FRONTEND_URL);

// const allowedOrigins = [
//   process.env.FRONTEND_URL, // Para producción
//   'http://localhost:3000',  // Para desarrollo local
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     console.log("🛰️ Origin recibido:", origin);
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log("❌ Error CORS: Not allowed by CORS:", origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));

// app.use(express.json());

// app.use("/api/servicios", serviciosRouter);
// app.use("/api/colaboradores", colaboradoresRouter);
// app.use("/api/reservas", reservasRouter);

// app.use(errorHandler);

// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//   console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
// });

// connectDB();



// import express from 'express';
// import cors from 'cors';
// import { connectDB } from './config/configDB.js' 
// import { serviciosRouter } from './routes/servicio.routes.js';
// import { colaboradoresRouter } from './routes/colaboradores.routes.js';
// import {errorHandler} from './middlewares/errorMiddleware.js'
// import reservasRouter from './routes/reservas.routes.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// app.use(cors())

// app.use(express.json() );

// app.use("api/servicios", serviciosRouter)
// app.use("api/colaboradores", colaboradoresRouter)
// app.use("api/reservas", reservasRouter)


// app.use(errorHandler)

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, ()=> {
//     console.log(`Server is running on port ${PORT}`);
// })

// connectDB()

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/configDB.js';
import { serviciosRouter } from './routes/servicio.routes.js';
import { colaboradoresRouter } from './routes/colaboradores.routes.js';
import { reservasRouter } from './routes/reservas.routes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

import { loadEnv } from '../../config/loadEnv.js';
loadEnv(['APP_PORT']);

const app = express();
const port = process.env.APP_PORT || '3000';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());


app.use("/api/servicios", serviciosRouter)
app.use("/api/colaboradores", colaboradoresRouter)
app.use("/api/reservas", reservasRouter)
app.use(errorHandler)

// Servir archivos estáticos del frontend (Vite)
app.use(express.static(path.join(__dirname, '../../front/dist')));
// reenviar todo al front React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front/dist/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//const PORT = process.env.PORT || 5000;


// app.listen(PORT, ()=> {


//     console.log(`Server is running on port ${PORT}`);

// })




connectDB()