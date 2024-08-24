class AppErrores extends Error {
  constructor(errorCode, statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

module.exports=AppErrores
