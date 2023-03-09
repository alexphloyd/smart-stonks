import createHttpError from 'http-errors';
import { NextApiResponse } from 'next';
import { ZodError } from 'zod';
import { ErrorResponse } from './apiHandler';

export default function errorHandler(err: unknown, res: NextApiResponse<ErrorResponse>) {
  if (createHttpError.isHttpError(err) && err.expose) {
    return res.status(err.statusCode).json({ error: { message: err.message } });
  } else if (err instanceof ZodError) {
    return res.status(400).json({ error: { message: err.errors.join(', ') } });
  } else {
    return res.status(500).json({
      error: { message: 'Internal Server Error', err: err },
      status: createHttpError.isHttpError(err) ? err.statusCode : 500,
    });
  }
}
