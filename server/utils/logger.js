const pino = require("pino");

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true }
})

// Create a logging instance
const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  // prettyPrint: process.env.NODE_ENV !== "production",
}, transport);

module.exports.logger = logger;
