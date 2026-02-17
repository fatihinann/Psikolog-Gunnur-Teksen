/**
 * Centralized logging utility
 * In production, logs should be sent to a monitoring service
 * In development, logs are output to console
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  error?: Error;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private shouldLog(level: LogLevel): boolean {
    // In production, only log warnings and errors
    if (this.isProduction) {
      return level === 'warn' || level === 'error';
    }
    // In development, log everything
    return true;
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const level = entry.level.toUpperCase().padEnd(5);
    return `[${timestamp}] [${level}] ${entry.message}`;
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>, error?: Error) {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      metadata,
      error,
    };

    const formattedMessage = this.formatMessage(entry);

    // Console output
    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage, metadata || '');
        }
        break;
      case 'info':
        console.info(formattedMessage, metadata || '');
        break;
      case 'warn':
        console.warn(formattedMessage, metadata || '');
        break;
      case 'error':
        console.error(formattedMessage, metadata || '', error || '');
        if (error && error.stack) {
          console.error('Stack trace:', error.stack);
        }
        break;
    }

    // In production, send to monitoring service
    // TODO: Integrate with Sentry, LogRocket, or similar service
    // if (this.isProduction && (level === 'error' || level === 'warn')) {
    //   this.sendToMonitoringService(entry);
    // }
  }

  debug(message: string, metadata?: Record<string, any>) {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata);
  }

  error(message: string, error?: Error, metadata?: Record<string, any>) {
    this.log('error', message, metadata, error);
  }

  // Future: Send to monitoring service
  // private async sendToMonitoringService(entry: LogEntry) {
  //   // Integrate with Sentry, LogRocket, etc.
  // }
}

export const logger = new Logger();

