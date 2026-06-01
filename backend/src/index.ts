/**
 * AI AUTOMATE PLATFORM - BACKEND ENTRY POINT
 * 
 * This is the main entry point for the backend server.
 * It initializes Express, connects to databases, and starts the API server.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

// Load environment variables
dotenv.config();

// Import utilities
import { logger } from './utils/logger';
import { initializeDatabase } from './config/database';
import { initializeRedis } from './config/redis';

// Import routes
import authRoutes from './routes/auth';
import workflowRoutes from './routes/workflows';
import executionRoutes from './routes/executions';
import webhookRoutes from './routes/webhooks';
import documentRoutes from './routes/documents';

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ════════════════════════════════════════════════════════════════

// CORS Configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// ════════════════════════════════════════════════════════════════
// API ROUTES
// ════════════════════════════════════════════════════════════════

const apiV1 = express.Router();

// Health check endpoint
apiV1.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Mount routes
apiV1.use('/auth', authRoutes);
apiV1.use('/workflows', workflowRoutes);
apiV1.use('/executions', executionRoutes);
apiV1.use('/webhooks', webhookRoutes);
apiV1.use('/documents', documentRoutes);

// Mount API version
app.use('/api/v1', apiV1);

// ════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ════════════════════════════════════════════════════════════════

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
      ...(NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// ════════════════════════════════════════════════════════════════
// INITIALIZATION
// ════════════════════════════════════════════════════════════════

const startServer = async () => {
  try {
    // Connect to PostgreSQL
    logger.info('Connecting to PostgreSQL...');
    await initializeDatabase();
    logger.info('✓ PostgreSQL connected');

    // Connect to Redis
    logger.info('Connecting to Redis...');
    await initializeRedis();
    logger.info('✓ Redis connected');

    // Create HTTP server for WebSocket support
    const server = createServer(app);

    // Initialize WebSocket
    const wss = new WebSocketServer({ server });
    wss.on('connection', (ws) => {
      logger.info('WebSocket client connected');
      
      ws.on('message', (message) => {
        logger.debug(`WebSocket message: ${message}`);
      });

      ws.on('close', () => {
        logger.info('WebSocket client disconnected');
      });

      ws.on('error', (error) => {
        logger.error(`WebSocket error: ${error}`);
      });
    });

    // Start server
    server.listen(PORT, () => {
      logger.info(`
╔════════════════════════════════════════════════════════════════╗
║      AI AUTOMATE PLATFORM - BACKEND SERVER STARTED             ║
╠════════════════════════════════════════════════════════════════╣
║  Environment: ${NODE_ENV.padEnd(48)}║
║  Port: ${String(PORT).padEnd(57)}║
║  API: http://localhost:${String(PORT).padEnd(44)}/api/v1       ║
║  WebSocket: ws://localhost:${String(PORT).padEnd(44)}         ║
╚════════════════════════════════════════════════════════════════╝
      `);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Start the server
startServer();
