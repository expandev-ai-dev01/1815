/**
 * @summary
 * GradeBox Backend Server
 * Main application entry point with Express configuration
 *
 * @module server
 */

// Load environment variables from .env file (MUST be first import!)
import 'dotenv/config';

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from '@/config';
import { errorMiddleware } from '@/middleware/error';
import { notFoundMiddleware } from '@/middleware/notFound';
import apiRoutes from '@/routes';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors(config.api.cors));

// Request processing middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'GradeBox API',
  });
});

// API Routes with versioning
app.use('/api', apiRoutes);

// 404 handler
app.use(notFoundMiddleware);

// Error handling
app.use(errorMiddleware);

let server: any;

async function startApplication() {
  try {
    console.log('Starting GradeBox API server...');

    server = app.listen(config.api.port, () => {
      console.log(
        `✓ Server running on port ${config.api.port} in ${
          process.env.NODE_ENV || 'development'
        } mode`
      );
      console.log(
        `✓ API available at http://localhost:${config.api.port}/api/${config.api.version}`
      );
      console.log(`✓ Health check at http://localhost:${config.api.port}/health`);
    });
  } catch (error: any) {
    console.error('Failed to start application:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start application
startApplication();

export default server;
