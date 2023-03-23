import { createLogger, transports } from "winston";
import { AppError } from "./appErrors";

const logErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app-errors.log" }),
  ],
});

class ErrorLogger {
  constructor() {}

  async logError(err) {
    console.log("==================== Start Error Logger ===============");
    logErrors.log({
      private: true,
      level: "error",
      message: `${new Date()} - ${JSON.stringify(err)}`,
    });
    console.log("==================== End Error Logger ===============");
    return false;
  }

  isTrustError(err) {
    if (err instanceof AppError) {
      return err.isOperational;
    } else {
      return false;
    }
  }
}

export { ErrorLogger };
