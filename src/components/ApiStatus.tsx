import React, { useEffect, useState } from 'react';
import { healthCheck, getApiInfo } from '../services/api';
import { API_CONFIG } from '../config/api';

const ApiStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const health = await healthCheck();
        const info = await getApiInfo();
        
        setStatus('connected');
        setMessage(`API conectada: ${info.message}`);
      } catch (error: any) {
        setStatus('error');
        setMessage(`Erro de conexão: ${error.message}`);
      }
    };

    checkApiStatus();
  }, []);

  return (
    <div className="mb-4 p-3 rounded-lg border">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          status === 'checking' ? 'bg-yellow-400' :
          status === 'connected' ? 'bg-green-400' :
          'bg-red-400'
        }`} />
        <span className="text-sm font-medium">
          {status === 'checking' ? 'Verificando API...' :
           status === 'connected' ? 'API Conectada' :
           'Erro de Conexão'}
        </span>
      </div>
      {message && (
        <p className="text-xs text-gray-600 mt-1">
          {message}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-1">
        Base URL: {API_CONFIG.BASE_URL}
      </p>
    </div>
  );
};

export default ApiStatus; 