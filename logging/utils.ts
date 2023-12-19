import pino, { Logger, LoggerOptions } from "pino";

// actions the application can take that we want to log
export type UserAction =
  | "GET_CURRENT_USER"
  | "CREATE_DOCUMENT"
  | "UPDATE_DOCUMENT"
  | "CREATE_CREATIVE_WORK";

export type ClientLogContext = {
  userAction: UserAction;
  [key: string]: unknown;
};

// Base configuration for the logger.
const baseConfig: LoggerOptions = {
  level: process.env.LOG_LEVEL,
  browser: {
    serialize: true,
    asObject: true,
    transmit: {
      level: process.env.LOG_LEVEL,
      send: (level, logEvent) => {
        const context = logEvent.messages[0];
        const message = logEvent.messages[1];
        const timeStamp = new Date(logEvent.ts).toISOString();
        const bindings = logEvent.bindings;

        const headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          type: "application/json",
        };
        const blob = new Blob(
          [JSON.stringify({ context, message, timeStamp, bindings, level })],
          headers
        );
        //send beacon sends a post request to the server with the log data, check out MDN for details
        navigator.sendBeacon(`/api/log`, blob);
      },
    },
  },
};

export function getLogger(name: string): Logger {
  const config = { ...baseConfig, name };

  return pino(config);
}

const log = getLogger("PalaborLogger");
export const logger = {
  ...log,
  info: (ctx: ClientLogContext, msg: string) =>
    log.info<ClientLogContext>(ctx, msg),
  error: (ctx: unknown, msg: string) => log.error(ctx, msg),
  warn: (ctx: ClientLogContext, msg: string) =>
    log.warn<ClientLogContext>(ctx, msg),
};
