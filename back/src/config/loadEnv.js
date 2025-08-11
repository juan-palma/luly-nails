// packages/config/loadEnv.js
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootEnvPath = path.resolve(__dirname, '../../../.env');

export function loadEnv(requiredVars = []) {
  // Verificar si ya están las variables necesarias
  const missingVars = requiredVars.filter((v) => !process.env[v]);

  if (missingVars.length === 0) {
    //console.log('[loadEnv] Variables ya presentes en el entorno, no se carga .env');
    return;
  }

  // Si falta alguna variable, intentamos cargar el .env
  if (fs.existsSync(rootEnvPath)) {
    dotenv.config({ path: rootEnvPath });
    //console.log(`[loadEnv] Cargado .env desde ${rootEnvPath}`);
  } else {
    console.warn('[loadEnv] No se encontró archivo .env en raíz');
  }
}
