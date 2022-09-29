import { NextFunction, Request, RequestHandler, Response } from 'express';

import { ErrorResponse } from 'helpers/response';

const authorize: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) throw new ErrorResponse('Forbidden', 403);

    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
