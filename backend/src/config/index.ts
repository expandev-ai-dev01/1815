/**
 * @summary
 * Application configuration management
 * Centralizes all environment-based configuration
 *
 * @module config
 */

export const config = {
  api: {
    port: parseInt(process.env.PORT || '3000', 10),
    version: process.env.API_VERSION || 'v1',
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.CORS_ORIGINS?.split(',') || []
          : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 86400,
    },
  },
  app: {
    name: 'GradeBox',
    description: 'Sistema minimalista para registro e consulta de notas de alunos',
  },
};
