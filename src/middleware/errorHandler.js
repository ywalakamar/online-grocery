import { ErrorLogger } from "../utils/errorLogger";

const ErrorHandler = async (err, req, res, next) => {
  const errorLogger = new ErrorLogger();

  if (err) {
    await errorLogger.logError(err);
    if (errorLogger.isTrustError(err)) {
      if (err.errorStack) {
        return res.status(err.statusCode).json({ message: err.errorStack });
      }

      return res.status(err.statusCode).json({
        message: err.message,
        description: err.description,
        code: err.statusCode,
        status: err.status,
      });
    }
    return res.status(err.statusCode).json({
      message: err.message,
      description: err.description,
      code: err.statusCode,
      status: err.status,
    });
  }
};

export default ErrorHandler;
