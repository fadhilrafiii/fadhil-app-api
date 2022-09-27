import { NextFunction, Request, RequestHandler, Response } from 'express';

import { SuccessResponse } from 'helpers/response';

export const logoutController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie('token');

    const response = new SuccessResponse(null, 'Logout success', 200);

    res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};
