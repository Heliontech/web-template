import pino from "pino";

const isDev = process.env.NODE_ENV === "development";

// Custom log levels
const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

// Base logger configuration
const config = {
  level: isDev ? "debug" : "info",
  customLevels: levels,
  formatters: {
    level: (label: string) => {
      return {
        level: label,
        timestamp: new Date().toISOString(),
      };
    },
  },
  serializers: {
    error: (error: Error) => ({
      message: error.message,
      stack: error.stack,
      name: error.name,
    }),
    // Sanitize sensitive data
    user: (user: { id: string; email?: string; password?: string }) => ({
      id: user.id,
      email: user.email ? "***" : undefined,
    }),
  },
  redact: {
    paths: [
      "password",
      "*.password",
      "passwordHash",
      "*.passwordHash",
      "secret",
      "*.secret",
      "token",
      "*.token",
    ],
    remove: true,
  },
  // Development formatting
  ...(isDev
    ? {
        transport: {
          target: "pino-pretty", // development uses pretty output for reading
          options: {
            colorize: true, // colorize output
            ignore: "pid,hostname",
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
          },
        },
      }
    : {}), // production uses json output directly
};

// Create base logger
const baseLogger = pino(config);

// Extended logger with context tracking
class Logger {
  private logger: typeof baseLogger;
  private defaultContext: Record<string, unknown>;

  constructor() {
    this.logger = baseLogger;
    this.defaultContext = {};
  }

  // Set default context for all subsequent logs
  setDefaultContext(context: Record<string, unknown>) {
    this.defaultContext = { ...this.defaultContext, ...context };
  }

  // Clear default context
  clearDefaultContext() {
    this.defaultContext = {};
  }

  private logWithContext(
    level: keyof typeof levels,
    message: string,
    context?: Record<string, unknown>
  ) {
    const mergedContext = { ...this.defaultContext, ...context };
    this.logger[level]({ ...mergedContext, msg: message });
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.logWithContext("debug", message, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.logWithContext("info", message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.logWithContext("warn", message, context);
  }

  error(message: string, context?: Record<string, unknown>) {
    this.logWithContext("error", message, context);
  }

  critical(message: string, context?: Record<string, unknown>) {
    this.logWithContext("crit", message, context);
  }

  // Log and track API requests
  logAPIRequest(req: Request, context?: Record<string, unknown>) {
    const url = new URL(req.url);
    this.info("API Request", {
      method: req.method,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams),
      ...context,
    });
  }

  // Log and track API responses
  logAPIResponse(
    req: Request,
    status: number,
    duration: number,
    context?: Record<string, unknown>
  ) {
    const url = new URL(req.url);
    this.info("API Response", {
      method: req.method,
      path: url.pathname,
      status,
      duration: `${duration}ms`,
      ...context,
    });
  }

  // Log errors with stack traces
  logError(error: Error, context?: Record<string, unknown>) {
    this.error(error.message, {
      error,
      stack: error.stack,
      ...context,
    });
  }

  // Create a child logger with additional context
  child(context: Record<string, unknown>) {
    const childLogger = new Logger();
    childLogger.setDefaultContext({ ...this.defaultContext, ...context });
    return childLogger;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export type for type checking
export type ILogger = Logger;
