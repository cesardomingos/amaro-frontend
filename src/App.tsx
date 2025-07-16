import React from 'react';
import FileUpload from './components/FileUpload';
import ApiStatus from './components/ApiStatus';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Processador de Fichas Financeiras
          </h1>
          <p className="text-gray-600">
            Faça upload dos PDFs das fichas financeiras e receba o Excel processado
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <ApiStatus />
          <FileUpload />
        </div>
      </div>
    </div>
  );
}

export default App;
