# GradeBox Backend API

Sistema minimalista para registro e consulta de notas de alunos.

## Tecnologias

- Node.js
- Express
- TypeScript

## Estrutura do Projeto

```
backend/
├── src/
│   ├── api/              # API controllers
│   ├── routes/           # Route definitions
│   ├── middleware/       # Express middleware
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration
│   └── server.ts         # Application entry point
├── dist/                 # Compiled JavaScript
├── package.json
├── tsconfig.json
└── .env.example
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no arquivo .env
```

## Scripts Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start
```

## Configuração

Edite o arquivo `.env` com as configurações necessárias:

```env
NODE_ENV=development
PORT=3000
API_VERSION=v1
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## Endpoints da API

### Health Check

```
GET /health
```

Retorna o status de saúde da aplicação.

### API Base

```
/api/v1/internal/*
```

Todos os endpoints da aplicação estão sob o prefixo `/api/v1/internal/`.

## Desenvolvimento

### Adicionando Novas Features

1. Criar controller em `src/api/v1/internal/[feature]/controller.ts`
2. Criar service em `src/services/[feature]/`
3. Adicionar rotas em `src/routes/v1/internalRoutes.ts`

### Padrões de Código

- Use TypeScript para type safety
- Siga as convenções de nomenclatura estabelecidas
- Documente funções com TSDoc comments
- Implemente tratamento de erros adequado
- Use os utilitários de resposta padronizados

## Estrutura de Resposta

### Sucesso

```json
{
  "success": true,
  "data": { ... },
  "metadata": {
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### Erro

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Licença

ISC
