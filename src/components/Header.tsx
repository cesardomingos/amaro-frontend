import React from 'react';
import styles from './Header.module.css';
import logoImage from '../assets/datanut-symbol-cor.png';

const Header: React.FC = () => {
  return (
    <div className={styles.datanautHeader}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.datanautLogo}>
            <img src={logoImage} alt="Datanaut Logo" className={styles.logoImage} />
          </div>
          <div>
            <h1 className={styles.title}>Datanaut</h1>
            <p className={styles.subtitle}>Importador de Fichas Financeiras</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 