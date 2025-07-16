# 🚀 Guia de Deploy - Amaro Processador de Fichas Financeiras

Este guia explica como fazer deploy da aplicação separando API (Render) e Frontend (Vercel).

## 📁 Estrutura dos Repositórios

### 1. API (Render)
```
amaro-api/
├── main_fixed.py          # Servidor FastAPI
├── requirements.txt       # Dependências Python
├── Procfile              # Configuração Render
├── runtime.txt           # Versão Python
├── README.md             # Documentação
└── process/
    └── app_processar_fichas.py  # Script de processamento
```

### 2. Frontend (Vercel)
```
amaro-frontend/
├── src/
│   ├── components/       # Componentes React
│   ├── services/        # Serviços de API
│   ├── types/           # Tipos TypeScript
│   └── config/          # Configurações
├── package.json
├── vite.config.ts
└── README.md
```

## 🔧 Deploy da API no Render

### Passo 1: Criar Repositório da API

1. **Criar novo repositório no GitHub:**
   - Nome: `amaro-api`
   - Descrição: API Python para processar fichas financeiras

2. **Fazer upload dos arquivos:**
   ```bash
   # Copiar arquivos da pasta backend/
   - main_fixed.py
   - requirements.txt
   - Procfile
   - runtime.txt
   - README.md
   - process/app_processar_fichas.py
   ```

### Passo 2: Configurar Render

1. **Acessar Render.com**
2. **Criar novo Web Service**
3. **Conectar repositório GitHub**
4. **Configurar:**
   - **Name**: `amaro-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main_fixed:app --host 0.0.0.0 --port $PORT`

### Passo 3: Deploy

1. **Clicar em "Create Web Service"**
2. **Aguardar deploy automático**
3. **Anotar a URL**: `https://amaro-api.onrender.com`

## 🎨 Deploy do Frontend na Vercel

### Passo 1: Criar Repositório do Frontend

1. **Criar novo repositório no GitHub:**
   - Nome: `amaro-frontend`
   - Descrição: Frontend React para processador de fichas

2. **Fazer upload dos arquivos:**
   ```bash
   # Copiar arquivos da pasta amaro/
   - src/
   - package.json
   - vite.config.ts
   - tailwind.config.js
   - tsconfig.json
   - README.md
   ```

### Passo 2: Configurar Vercel

1. **Acessar Vercel.com**
2. **Importar projeto do GitHub**
3. **Configurar:**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Passo 3: Configurar Variáveis de Ambiente

Na Vercel, adicionar variável:
- **Name**: `VITE_API_BASE_URL`
- **Value**: `https://amaro-api.onrender.com`

### Passo 4: Deploy

1. **Clicar em "Deploy"**
2. **Aguardar build e deploy**
3. **Anotar a URL**: `https://amaro-frontend.vercel.app`

## 🔗 Configuração Final

### API (Render)
- **URL**: https://amaro-api.onrender.com
- **Status**: ✅ Ativo
- **CORS**: Configurado para aceitar Vercel

### Frontend (Vercel)
- **URL**: https://amaro-frontend.vercel.app
- **Status**: ✅ Ativo
- **API**: Conectada ao Render

## 🧪 Teste da Aplicação

1. **Acessar**: https://amaro-frontend.vercel.app
2. **Fazer upload de PDFs**
3. **Verificar download do Excel**

## 🔄 Atualizações

### API
- Push para `amaro-api` → Deploy automático no Render

### Frontend
- Push para `amaro-frontend` → Deploy automático na Vercel

## 🛠️ Desenvolvimento Local

### API
```bash
cd amaro-api
pip install -r requirements.txt
python main_fixed.py
```

### Frontend
```bash
cd amaro-frontend
npm install
npm run dev
```

## 📊 Monitoramento

- **Render**: Dashboard com logs e métricas
- **Vercel**: Analytics e performance
- **GitHub**: Histórico de commits

## 🔒 Segurança

- **HTTPS**: Automático em ambas plataformas
- **CORS**: Configurado corretamente
- **Rate Limiting**: Implementado no Render
- **Environment Variables**: Seguras

## 💰 Custos

- **Render**: Gratuito para projetos pequenos
- **Vercel**: Gratuito para projetos pessoais
- **GitHub**: Gratuito para repositórios públicos

---

**🎉 Sua aplicação estará online e funcionando!** 