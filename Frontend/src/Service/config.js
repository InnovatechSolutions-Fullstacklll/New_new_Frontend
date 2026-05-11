// src/Service/config.js
const config = {
  development: {
    API_BASE_URL: 'http://localhost:9090',
    REGISTER_SERVICE_URL: 'http://localhost:9091',
    LOGIN_SERVICE_URL: 'http://localhost:9092',
  },
  test: {
    API_BASE_URL: 'http://localhost:9090',
    REGISTER_SERVICE_URL: 'http://localhost:9091',
    LOGIN_SERVICE_URL: 'http://localhost:9092',
  },
  production: {
    API_BASE_URL: 'https://tu-api-produccion.com',
    REGISTER_SERVICE_URL: 'https://tu-api-produccion.com',
    LOGIN_SERVICE_URL: 'https://tu-api-produccion.com',
  },
};

// Determinar el entorno actual
const currentEnv = process.env.NODE_ENV || 'development';
const activeConfig = config[currentEnv] || config.development;

export const API_BASE_URL = activeConfig.API_BASE_URL;
export const REGISTER_SERVICE_URL = activeConfig.REGISTER_SERVICE_URL;
export const LOGIN_SERVICE_URL = activeConfig.LOGIN_SERVICE_URL;
export default config;