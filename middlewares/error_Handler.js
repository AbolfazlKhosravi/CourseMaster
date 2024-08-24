const AppErrores = require("../utilities/app_errores");
const logger = require("../utilities/winstonLogger");

function errorHandler(err, req, res, next) {
  // if (err.name === "ValidationError") {
  //   return res.status(400).send(err.details[0].message);
  // }
  // if (err.message === "notFounded") {
  //   return res.status(404).send("course whith this id not founded");
  // }
  logger.log("warn", {
    message: err.message,
    errorCode: err.errorCode,
    statusCode: err.statusCode,
  });
  if (err instanceof AppErrores) {
    return res.status(err.statusCode).send({
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  res.status(500).send("some thing failed");
}

module.exports = errorHandler;
