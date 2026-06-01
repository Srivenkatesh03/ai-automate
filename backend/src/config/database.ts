/**
 * DATABASE CONFIGURATION
 * PostgreSQL connection setup and initialization
 */

import { Pool, PoolClient } from 'pg';
import { logger } from '../utils/logger';

let pool: Pool;

export const getDatabase = (): Pool => {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return pool;
};

export const initializeDatabase = async (): Promise<void> => {
  try {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'aiuser',
      password: process.env.DB_PASSWORD || 'aipassword123',
      database: process.env.DB_NAME || 'ai_automate_db',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Test connection
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();

    logger.info('Database connection successful');
  } catch (error) {
    logger.error('Database connection failed:', error);
    throw error;
  }
};

export const query = async (text: string, params?: any[]) => {
  const db = getDatabase();
  return db.query(text, params);
};

export const getClient = async (): Promise<PoolClient> => {
  const db = getDatabase();
  return db.connect();
};
