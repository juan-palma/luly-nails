import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Ruta al directorio raíz donde está el archivo .env (2 niveles arriba de vite.config.js)
  const envDir = path.resolve(__dirname, '../');
  const envFromFile = loadEnv(mode, envDir, 'VITE_');

  const env = Object.fromEntries(
    Object.entries(envFromFile).map(([key, val]) => [
      key,
      process.env[key] || val,  
    ])
  );

  console.log('Variables existentes:', env);

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000/api',
          changeOrigin: true,
        },
      },
    },
    envDir,
  };
});
