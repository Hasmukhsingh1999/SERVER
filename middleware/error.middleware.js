export const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const message = err.message;
  if (err.message === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resources not found";
  }
  res.status(statusCode).json({
    message,
  });
};
