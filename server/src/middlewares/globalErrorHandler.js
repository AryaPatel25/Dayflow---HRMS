import { config } from "../config/config.js";

// Global error handler
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    errorStack: config.env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
