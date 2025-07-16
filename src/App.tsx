import { useState } from 'react';
import Header from './components/Header';
import ProgressSteps from './components/ProgressSteps';
import FileUpload from './components/FileUpload';
import ApiStatus from './components/ApiStatus';
import styles from './App.module.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasFiles, setHasFiles] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReadyForDownload, setIsReadyForDownload] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  const handleFilesChange = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setHasFiles(true);
      setCurrentStep(1); // Upload step ativo
    } else {
      setHasFiles(false);
      setCurrentStep(1); // Reset to first step
    }
  };

  const handleProcessingStart = () => {
    setIsProcessing(true);
    setCurrentStep(2); // Processing step ativo
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setIsReadyForDownload(true);
    setCurrentStep(3); // Download step ativo
  };

  const handleDownloadComplete = () => {
    setIsReadyForDownload(false);
    setDownloadCompleted(true);
    // Aguardar um momento para mostrar o Step 3 como concluído
    setTimeout(() => {
      setIsCompleted(true);
      setDownloadCompleted(false);
    }, 1000);
  };

  const handleNewMission = () => {
    setCurrentStep(1);
    setHasFiles(false);
    setIsProcessing(false);
    setIsReadyForDownload(false);
    setIsCompleted(false);
    setDownloadCompleted(false);
  };

  // Calcular o step atual baseado no estado real
  const getCurrentStep = () => {
    if (isCompleted) return 3; // Missão concluída - todos os steps concluídos
    if (downloadCompleted) return 3; // Download concluído, aguardando reset
    if (isReadyForDownload) return 3; // Download em andamento
    if (isProcessing) return 2; // Processamento em andamento
    if (hasFiles) return 1; // Upload ativo
    return 1; // Estado inicial
  };

  return (
    <div className={styles.datanautTheme}>
      <Header />
      
      <div className={styles.container}>
        <ProgressSteps 
          currentStep={getCurrentStep()} 
          totalSteps={3} 
          isCompleted={isCompleted} 
        />
        
        <div className={styles.maxWidth4xl}>
          <ApiStatus />
          <FileUpload 
            onFilesChange={handleFilesChange}
            onProcessingStart={handleProcessingStart}
            onProcessingComplete={handleProcessingComplete}
            onDownloadComplete={handleDownloadComplete}
            isProcessing={isProcessing}
            isReadyForDownload={isReadyForDownload}
            isCompleted={isCompleted}
            onNewMission={handleNewMission}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
