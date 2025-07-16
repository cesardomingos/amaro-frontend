import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCloudUploadAlt, 
  faCogs, 
  faDownload,
  faClock,
  faCheck,
  faPause
} from '@fortawesome/free-solid-svg-icons';
import styles from './ProgressSteps.module.css';

interface ProgressStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'active' | 'waiting' | 'completed';
  icon: any;
}

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  isCompleted?: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, totalSteps, isCompleted = false }) => {
  const steps: ProgressStep[] = [
    {
      id: 'upload',
      title: 'Upload',
      subtitle: 'Envio de arquivos',
      description: 'Selecione até 8 PDFs',
      status: currentStep >= 2 || isCompleted ? 'completed' : currentStep === 1 ? 'active' : 'waiting',
      icon: faCloudUploadAlt
    },
    {
      id: 'processing',
      title: 'Processamento',
      subtitle: 'Geração de dados',
      description: 'Criando planilha e relatórios',
      status: currentStep === 2 ? 'active' : currentStep >= 3 || isCompleted ? 'completed' : 'waiting',
      icon: faCogs
    },
    {
      id: 'download',
      title: 'Download',
      subtitle: 'Resultados',
      description: 'Baixe seus arquivos',
      status: isCompleted ? 'completed' : currentStep === 3 ? 'active' : 'waiting',
      icon: faDownload
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return faClock;
      case 'completed':
        return faCheck;
      default:
        return faPause;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Em andamento';
      case 'completed':
        return 'Concluído';
      default:
        return 'Aguardando';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Progresso do Processamento</h2>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>{currentStep}/{totalSteps}</span>
        </div>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`${styles.stepCard} ${
              step.status === 'active' ? styles.stepCardActive : 
              step.status === 'completed' ? styles.stepCardCompleted : 
              styles.stepCardInactive
            }`}
          >
            <div className={styles.stepContent}>
              <div className={`${styles.stepIcon} ${
                step.status === 'active' ? styles.stepIconActive : 
                step.status === 'completed' ? styles.stepIconCompleted : 
                styles.stepIconInactive
              }`}>
                <FontAwesomeIcon icon={step.icon} />
              </div>
              <div className={styles.stepInfo}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepSubtitle}>{step.subtitle}</p>
                <p className={styles.stepDescription}>{step.description}</p>
                <div className={styles.stepStatus}>
                  <span className={styles.statusIcon}>
                    <FontAwesomeIcon icon={getStatusIcon(step.status)} />
                  </span>
                  <span className={`${styles.statusText} ${
                    step.status === 'active' ? styles.statusTextActive : 
                    step.status === 'completed' ? styles.statusTextCompleted : 
                    styles.statusTextInactive
                  }`}>
                    {getStatusText(step.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps; 