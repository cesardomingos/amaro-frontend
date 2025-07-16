// Configuração da API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://amaro-api.onrender.com',
  TIMEOUT: 300000, // 5 minutos para processar PDFs grandes
  ENDPOINTS: {
    ROOT: '/',
    HEALTH: '/api/health',
    PROCESS_PDFS: '/api/processar-pdfs/',
  }
} as const; 