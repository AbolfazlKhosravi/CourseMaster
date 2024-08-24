const { createLogger, transports, format, level } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    label({ label: "error logger " }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ level: "error", filename: "winstonLogger.log" }),
    new transports.Http({
      level: "warn",
      host: "localhost",
      port: 5500,
      ssl:false,
      path: "/api/winstonLogger",
    }),
  ],
});
module.exports = logger;
