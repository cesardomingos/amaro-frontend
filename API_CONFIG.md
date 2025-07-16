# Configuração da API

## Base URL

A aplicação está configurada para se conectar com a API Python na porta 8000:

```
http://localhost:8000
```

## Configuração Atual

- **Arquivo de Configuração**: `src/config/api.ts`
- **Base URL**: `http://localhost:8000`
- **Timeout**: 5 minutos (300000ms)
- **CORS**: Configurado para aceitar requisições do frontend

## Endpoints Disponíveis

- `GET /` - Informações da API
- `GET /api/health` - Health check
- `POST /api/processar-pdfs/` - Processar PDFs

## Como Alterar a URL da API

### Opção 1: Variável de Ambiente (Recomendado)

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Opção 2: Editar Diretamente

Modifique o arquivo `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000', // Altere aqui
  // ...
}
```

## Verificação de Status

O componente `ApiStatus` mostra:
- ✅ **Verde**: API conectada
- ❌ **Vermelho**: Erro de conexão
- 🟡 **Amarelo**: Verificando conexão

## Troubleshooting

### Erro de CORS
Se aparecer erro de CORS, verifique se a API está rodando na porta 8000 e se o CORS está configurado corretamente no backend.

### Erro de Conexão
1. Verifique se o servidor Python está rodando
2. Confirme se está na porta 8000
3. Teste acessando diretamente: http://localhost:8000/api/health 