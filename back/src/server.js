import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/configDB.js';
import { serviciosRouter } from './routes/servicio.routes.js';
import { colaboradoresRouter } from './routes/colaboradores.routes.js';
import { reservasRouter } from './routes/reservas.routes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

// Cargar las variables de entorno desde el archivo .env en el directorio raíz
import { loadEnv } from './config/loadEnv.js';
loadEnv(['APP_PORT']);

const app = express();
const port = process.env.APP_PORT || '3050';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allowedOrigins = process.env.DOMAIN_CORS.split(',');
app.use(cors({
  origin: function(origin, callback) {
    // permitir requests sin origen (como Postman o servidores)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));
app.use(express.json());


app.use("/api/servicios", serviciosRouter)
app.use("/api/colaboradores", colaboradoresRouter)
app.use("/api/reservas", reservasRouter)
app.use(errorHandler)

//app.get('/test', (req, res) => {
//  res.json({ valor: 'test3' });
//});

// Servir archivos estáticos del frontend (Vite)
app.use(express.static(path.join(__dirname, '../../front/dist')));
// reenviar todo al front React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front/dist/index.html'));
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

