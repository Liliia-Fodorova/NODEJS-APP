import { isCelebrateError } from 'celebrate';
import { isHttpError } from 'http-errors';

export const errorHandler = (err, req,res, next) => {
  console.error("Error Middleware:", err);

  if (isCelebrateError(err)) {
    return res.status(400).json({
      status: 400,
      message: 'Validation Failed',
      data: { message: 'Invalid id format' }
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request',
      data: { message: err.message }
    });
  }

  if (isHttpError(err)) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd ? "Something went wrong. Please try again later." : err.message,
  });
};
