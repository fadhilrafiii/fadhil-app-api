import { NextFunction, Request, RequestHandler, Response } from 'express';

import { ErrorResponse, SuccessResponse } from 'helpers/response';

export const logoutController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.session.destroy((err: unknown) => {
      if (err) next(new ErrorResponse('Failed to logout', 400));
    });

    res.clearCookie('sid');
    const response = new SuccessResponse(null, 'Logout success', 200);

    res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};
