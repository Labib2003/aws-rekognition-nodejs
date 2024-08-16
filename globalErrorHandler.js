const globalErrorHandler = (error, req, res, next) => {
  console.log("Global error handler: ", error);

  let statusCode = 500;
  let message = error?.message || "Something went wrong";
  let errors = [];

  if (error instanceof Error) {
    message = error?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
  next();
};

export default globalErrorHandler;
