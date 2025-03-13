import httpStatus from 'http-status';
import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(statusCode, message, isOperational, stack = '') {
    super(message);

    this.statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    this.isOperational = isOperational ?? true;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this);
  }
}

export default function apiErrorHandler(err) {
  let { statusCode, message } = err;

  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  if (!message) message = httpStatus[statusCode];

  const error = {
    message,
    statusCode,
  };

  if (err?.stack && process.env.NODE_ENV !== 'production') {
    error.stack = err?.stack;
  }

  return NextResponse.json({ error }, { status: statusCode });
}
