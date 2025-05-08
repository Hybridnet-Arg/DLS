import httpStatus from 'http-status';
import { NextResponse } from 'next/server';
import logger from '../logger.util';

export class ApiError extends Error {
  constructor(statusCode, message, isOperational, stack = '') {
    super(message);

    this.statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    this.isOperational = isOperational ?? true;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this);
  }
}

/**
 * Handles API errors by formatting and logging them, then returns a JSON response.
 *
 * @param {ApiError} err - The error object that was thrown.
 * @param {object} [options={}] - Optional settings.
 * @param {string} [options.fallbackMessage] - A fallback message to use if the error message is not operational.
 *
 * @returns {NextResponse} - A JSON response containing the error details.
 */
export default function apiErrorHandler(err, options = {}) {
  let { statusCode, message } = err;

  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message =
      options?.fallbackMessage ?? httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  if (!message) {
    message = options?.fallbackMessage ?? httpStatus[statusCode];
  }

  const error = {
    message,
    statusCode,
  };

  logger.error(err);

  if (err?.stack && process.env.NODE_ENV !== 'production') {
    error.stack = err?.stack;
  }

  return NextResponse.json({ error }, { status: statusCode });
}
