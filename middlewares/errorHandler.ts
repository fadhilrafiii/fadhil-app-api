import { NextFunction, Request, Response } from 'express';

import { ErrorResponse } from 'helpers/response';

export const errorHandler = (
  error: ErrorResponse | TypeError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  console.log('Path: ', req.path);
  console.error('Error: ', typeof error, error);

  if (error instanceof TypeError) res.status(500).json(error);
  else res.status(error.status).json(error);
};
