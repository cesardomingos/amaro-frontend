import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { processarPDFs } from '../services/api';

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => 
      file.type === 'application/pdf'
    );
    setFiles(pdfFiles);
    setMessage(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const handleProcess = async () => {
    if (files.length === 0) {
      setMessage({ text: 'Selecione pelo menos um arquivo PDF', type: 'error' });
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const blob = await processarPDFs(files);
      
      // Criar link para download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Cálculo.v15 - Poupança - Preenchido.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setMessage({ 
        text: `Processamento concluído! ${files.length} arquivo(s) processado(s).`, 
        type: 'success' 
      });
    } catch (err: any) {
      setMessage({ 
        text: err.response?.data?.detail || 'Erro ao processar arquivos', 
        type: 'error' 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Processador de Fichas Financeiras
        </h2>

        {/* Área de Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-gray-600">
            {isDragActive ? (
              <p>Solte os arquivos PDF aqui...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">
                  Arraste e solte arquivos PDF aqui, ou clique para selecionar
                </p>
                <p className="text-sm text-gray-500">
                  Apenas arquivos PDF são aceitos
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lista de Arquivos */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Arquivos Selecionados:</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <span className="text-sm">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botão de Processamento */}
        {files.length > 0 && (
          <div className="mt-6">
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isProcessing ? 'Processando...' : 'Processar PDFs'}
            </button>
          </div>
        )}

        {/* Mensagens */}
        {message && (
          <div className={`mt-4 p-4 rounded ${
            message.type === 'error' 
              ? 'bg-red-100 border border-red-400 text-red-700'
              : message.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-blue-100 border border-blue-400 text-blue-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload; 