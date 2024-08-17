const globalErrorHandler = (error, _req, res, next) => {
  console.log("Global error handler: ", error);

  let statusCode = 500;
  let message = error?.message || "Something went wrong";

  if (error instanceof Error) {
    message = error?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
  next();
};

export default globalErrorHandler;
