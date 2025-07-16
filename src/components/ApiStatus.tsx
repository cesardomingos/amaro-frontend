import React, { useEffect, useState } from 'react';
import { getApiInfo } from '../services/api';
import { API_CONFIG } from '../config/api';
import styles from './ApiStatus.module.css';

const ApiStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
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

  const getStatusIndicatorClass = () => {
    switch (status) {
      case 'checking':
        return styles.statusIndicatorChecking;
      case 'connected':
        return styles.statusIndicatorConnected;
      case 'error':
        return styles.statusIndicatorError;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.statusContainer}>
          <div className={`${styles.statusIndicator} ${getStatusIndicatorClass()}`} />
          <div className={styles.statusInfo}>
            <span className={styles.statusText}>
              {status === 'checking' ? 'Verificando API...' :
               status === 'connected' ? 'API Conectada' :
               'Erro de Conexão'}
            </span>
            {/* {message && (
              <p className={styles.statusMessage}>
                {message}
              </p>
            )} */}
          </div>
        </div>
        {/* <div className={styles.apiUrl}>
          {API_CONFIG.BASE_URL}
        </div> */}
      </div>
    </div>
  );
};

export default ApiStatus; 