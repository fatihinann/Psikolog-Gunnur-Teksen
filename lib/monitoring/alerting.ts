type AlertLevel = 'info' | 'warning' | 'error';

interface AlertMessage {
  message: string;
  level: AlertLevel;
  timestamp: Date;
  metadata?: Record<string, any>;
}

class AlertingService {
  async alert(level: AlertLevel, message: string, metadata?: Record<string, any>) {
    const alertMessage: AlertMessage = {
      message,
      level,
      timestamp: new Date(),
      metadata
    };

    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}] ${message}`, metadata || '');
    }
    
    // In production you could send to a monitoring service
    // await this.sendToMonitoringService(alertMessage);
  }

  async error(message: string, error?: Error) {
    await this.alert('error', message, { error: error?.message, stack: error?.stack });
  }

  async warning(message: string, metadata?: Record<string, any>) {
    await this.alert('warning', message, metadata);
  }

  async info(message: string, metadata?: Record<string, any>) {
    await this.alert('info', message, metadata);
  }
}

export const alerting = new AlertingService();