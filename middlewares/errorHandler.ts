import { NextFunction, Request, Response } from 'express';

import { MongooseError } from 'mongoose';

import { ErrorResponse } from 'helpers/response';

const errorHandler = (
  error: APIError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  console.error('Path: ', req.path);
  console.error('Error: ', error);

  if (error instanceof TypeError || error instanceof ErrorResponse) {
    if (error instanceof TypeError) res.status(500).json(error);
    else res.status(error.status).json(error);
  } else {
    // This is handler for Mongo Error
    const mongoError = new ErrorResponse((error as MongooseError).message, 400);
    res.status(400).json(mongoError);
  }
};

export default errorHandler;
