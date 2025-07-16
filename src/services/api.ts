import axios from 'axios';
import type { ApiResponse } from '../types/api';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

export const processarPDFs = async (files: File[]): Promise<Blob> => {
  const formData = new FormData();
  
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post(API_CONFIG.ENDPOINTS.PROCESS_PDFS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob', // Para download do arquivo
  });

  return response.data;
};

export const getApiInfo = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>(API_CONFIG.ENDPOINTS.ROOT);
  return response.data;
}; 