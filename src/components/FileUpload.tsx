import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilePdf, 
  faTimes, 
  faRocket,
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { processarPDFs } from '../services/api';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: () => void;
  onDownloadComplete?: () => void;
  isProcessing?: boolean;
  isReadyForDownload?: boolean;
  isCompleted?: boolean;
  onNewMission?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFilesChange, 
  onProcessingStart, 
  onProcessingComplete,
  onDownloadComplete,
  isProcessing = false,
  isReadyForDownload = false,
  isCompleted = false,
  onNewMission
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [localIsProcessing, setLocalIsProcessing] = useState(false);
  const [localIsCompleted, setLocalIsCompleted] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);

  // Notificar mudanças nos arquivos
  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files, onFilesChange]);

  // Sincronizar estados externos
  useEffect(() => {
    setLocalIsProcessing(isProcessing);
  }, [isProcessing]);

  useEffect(() => {
    setLocalIsCompleted(isCompleted);
  }, [isCompleted]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => 
      file.type === 'application/pdf'
    );
    
    // Limitar a 8 arquivos
    if (pdfFiles.length > 8) {
      setMessage({ text: 'Máximo de 8 arquivos permitido', type: 'error' });
      return;
    }
    
    setFiles(pdfFiles);
    setMessage(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true,
    maxFiles: 8
  });

  const handleProcess = async () => {
    if (files.length === 0) {
      setMessage({ text: 'Selecione pelo menos um arquivo PDF', type: 'error' });
      return;
    }

    setLocalIsProcessing(true);
    setMessage(null);
    
    // Notificar início do processamento
    if (onProcessingStart) {
      onProcessingStart();
    }

    try {
      const blob = await processarPDFs(files);
      setProcessedBlob(blob);
      
      setMessage({ 
        text: `Processamento concluído! ${files.length} arquivo(s) processado(s). Arquivo pronto para download.`, 
        type: 'success' 
      });
      
      // Notificar conclusão do processamento
      if (onProcessingComplete) {
        onProcessingComplete();
      }
    } catch (err: any) {
      setMessage({ 
        text: err.response?.data?.detail || 'Erro ao processar arquivos', 
        type: 'error' 
      });
    } finally {
      setLocalIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob) return;

    // Criar link para download
    const url = window.URL.createObjectURL(processedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Cálculo.v15 - Poupança - Preenchido.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Marcar download como concluído
    setDownloadCompleted(true);
    setMessage({ 
      text: 'Download concluído com sucesso!', 
      type: 'success' 
    });

    // Notificar conclusão do download após um delay
    setTimeout(() => {
      if (onDownloadComplete) {
        onDownloadComplete();
      }
    }, 1500);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'error':
        return faExclamationTriangle;
      case 'success':
        return faCheck;
      default:
        return faInfoCircle;
    }
  };

  // Card de missão concluída
  if (localIsCompleted) {
    return (
      <div className={styles.container}>
        <div className={styles.missionComplete}>
          <div className={styles.missionIcon}>
            <FontAwesomeIcon icon={faRocket} />
          </div>
          <h2 className={styles.missionTitle}>
            Missão Concluída, Comandante!
          </h2>
          <p className={styles.missionDescription}>
            Seus arquivos foram processados com sucesso e o download foi realizado.
          </p>
          <button 
            onClick={onNewMission}
            className={styles.newMissionButton}
          >
            Nova Missão
          </button>
        </div>
      </div>
    );
  }

  // Card de download pronto
  if (isReadyForDownload && processedBlob) {
    return (
      <div className={styles.container}>
        <div className={styles.downloadReady}>
          <div className={styles.downloadIcon}>
            <FontAwesomeIcon icon={faDownload} />
          </div>
          <h2 className={styles.downloadTitle}>
            Arquivo Pronto para Download!
          </h2>
          <p className={styles.downloadDescription}>
            O processamento foi concluído com sucesso. Clique no botão abaixo para baixar o arquivo Excel.
          </p>
          <button 
            onClick={handleDownload}
            className={styles.downloadButton}
            disabled={downloadCompleted}
          >
            <FontAwesomeIcon icon={faDownload} />
            {downloadCompleted ? 'Download Concluído!' : 'Baixar Arquivo Excel'}
          </button>
          {downloadCompleted && (
            <div className={styles.downloadSuccess}>
              <FontAwesomeIcon icon={faCheck} />
              <span>Download realizado com sucesso!</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Seção de Upload */}
      <div className={styles.uploadSection}>
        <h2 className={styles.title}>
          Envio de Arquivos PDF
        </h2>
        <p className={styles.subtitle}>
          Selecione até 8 fichas financeiras em formato PDF para processar
        </p>

        {/* Área de Upload */}
        <div
          {...getRootProps()}
          className={`${styles.uploadArea} ${
            isDragActive ? styles.uploadAreaActive : ''
          }`}
        >
          <input {...getInputProps()} />
          <div className={styles.uploadContent}>
            <div className={styles.uploadIcon}>
              <FontAwesomeIcon icon={faFilePdf} />
            </div>
            <h3 className={styles.uploadTitle}>
              Envie suas fichas financeiras
            </h3>
            <p className={styles.uploadDescription}>
              Arraste e solte até 8 arquivos PDF ou clique para selecionar
            </p>
            <button className={styles.selectButton}>
              Selecionar Arquivos
            </button>
          </div>
        </div>

        {/* Status dos arquivos */}
        <div className={styles.fileStatus}>
          <p>
            Arquivos enviados: {files.length}/8
          </p>
        </div>
      </div>

      {/* Lista de Arquivos */}
      {files.length > 0 && (
        <div className={styles.filesSection}>
          <h3 className={styles.filesTitle}>Arquivos Selecionados:</h3>
          <div className={styles.filesList}>
            {files.map((file, index) => (
              <div key={index} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <div className={styles.fileIcon}>
                    <FontAwesomeIcon icon={faFilePdf} className={styles.fileIconText} />
                  </div>
                  <span className={styles.fileName}>{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className={styles.removeButton}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão de Iniciar Processamento */}
      {files.length > 0 && (
        <div className={styles.processButton}>
          <button
            onClick={handleProcess}
            disabled={localIsProcessing}
            className={`${styles.processButtonContent} ${
              localIsProcessing ? styles.processButtonDisabled : styles.processButtonEnabled
            }`}
          >
            <span>{localIsProcessing ? 'Processando...' : 'Iniciar Processamento'}</span>
            {!localIsProcessing && <span>→</span>}
          </button>
        </div>
      )}

      {/* Mensagens */}
      {message && (
        <div className={`${styles.message} ${
          message.type === 'error' 
            ? styles.messageError
            : message.type === 'success'
            ? styles.messageSuccess
            : styles.messageInfo
        }`}>
          <div className={styles.messageContent}>
            <span className={styles.messageIcon}>
              <FontAwesomeIcon icon={getMessageIcon(message.type)} />
            </span>
            <span className={styles.messageText}>{message.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 