# Amaro Frontend - Processador de Fichas Financeiras

Frontend React + TypeScript + Vite para processar PDFs de fichas financeiras.

## Tecnologias

- React 19
- TypeScript
- Vite
- Axios
- React Dropzone
- Tailwind CSS

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

A aplicação estará disponível em: http://localhost:5173

## Deploy na Vercel

### 1. Configurar Variáveis de Ambiente

Na Vercel, adicione a variável:
- `VITE_API_BASE_URL`: `https://amaro-api.onrender.com`

### 2. Deploy Automático

- Conectar repositório GitHub à Vercel
- Deploy automático a cada push

### 3. Domínio

A aplicação estará disponível em: `https://amaro-frontend.vercel.app`

## Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── services/      # Serviços de API
├── types/         # Tipos TypeScript
├── config/        # Configurações
└── process/       # Scripts Python (local)
```

## API

A aplicação se conecta com a API Python hospedada no Render:
- **URL**: https://amaro-api.onrender.com
- **Endpoints**: `/api/processar-pdfs/`, `/api/health`
