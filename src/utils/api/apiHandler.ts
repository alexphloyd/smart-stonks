import createHttpError from 'http-errors';

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Method } from 'axios';
import errorHandler from './errorHandler';

export interface ErrorResponse {
  error: {
    message: string;
    err?: any; // Sent for unhandled errors reulting in 500
  };
  status?: number; // Sent for unhandled errors reulting in 500
}
type ApiMethodHandlers = {
  [key in Uppercase<Method>]?: NextApiHandler;
};

export function apiHandler(handler: ApiMethodHandlers) {
  return async (req: NextApiRequest, res: NextApiResponse<ErrorResponse>) => {
    try {
      const method = req.method ? (req.method.toUpperCase() as keyof ApiMethodHandlers) : undefined;

      if (!method)
        throw new createHttpError.MethodNotAllowed(`No method specified on path ${req.url}!`);

      const methodHandler = handler[method];
      if (!methodHandler)
        throw new createHttpError.MethodNotAllowed(
          `Method ${req.method} Not Allowed on path ${req.url}!`
        );

      await methodHandler(req, res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
}
