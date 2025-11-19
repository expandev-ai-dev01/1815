# GradeBox Frontend

Sistema minimalista para registrar e consultar notas de alunos.

## Tecnologias

- React 19.2.0
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router 7.9.3
- TanStack Query 5.90.2
- Axios 1.12.2
- Zustand 5.0.8
- React Hook Form 7.63.0
- Zod 4.1.11

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Ajuste as variáveis de ambiente conforme necessário.

## Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── assets/                # Recursos estáticos
│   └── styles/           # Estilos globais
├── core/                  # Componentes e utilitários compartilhados
│   ├── components/       # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   ├── types/            # Tipos TypeScript globais
│   └── utils/            # Funções utilitárias
├── domain/               # Domínios de negócio
├── pages/                # Páginas da aplicação
│   └── layouts/          # Layouts compartilhados
└── main.tsx              # Ponto de entrada
```

## Padrões de Código

- TypeScript strict mode habilitado
- ESLint configurado para React e TypeScript
- Tailwind CSS para estilização
- Path alias `@/` configurado para `./src`

## Integração com Backend

O frontend se comunica com o backend através da API REST:

- Base URL: `http://localhost:3000/api/v1/internal`
- Autenticação: Bearer token (quando implementado)
- Timeout: 30 segundos

## Próximos Passos

- Implementar funcionalidade de gerenciamento de notas
- Adicionar autenticação (se necessário)
- Criar componentes de domínio específicos
- Implementar testes