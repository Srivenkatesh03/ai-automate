/**
 * LOGGER UTILITY
 * Centralized logging for the application
 */

type LogLevel = 'info' | 'error' | 'warn' | 'debug';

interface LogEntry {
  level: LogLevel;
  timestamp: string;
  message: string;
  data?: any;
}

const formatLog = (level: LogLevel, message: string, data?: any): LogEntry => {
  return {
    level,
    timestamp: new Date().toISOString(),
    message,
    ...(data && { data })
  };
};

export const logger = {
  info: (message: string, data?: any) => {
    const log = formatLog('info', message, data);
    console.log(JSON.stringify(log));
  },

  error: (message: string, error?: any) => {
    const log = formatLog('error', message, {
      error: error instanceof Error ? error.message : error
    });
    console.error(JSON.stringify(log));
  },

  warn: (message: string, data?: any) => {
    const log = formatLog('warn', message, data);
    console.warn(JSON.stringify(log));
  },

  debug: (message: string, data?: any) => {
    if (process.env.DEBUG === 'true') {
      const log = formatLog('debug', message, data);
      console.debug(JSON.stringify(log));
    }
  }
};
