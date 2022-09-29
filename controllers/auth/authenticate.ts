import { NextFunction, Request, RequestHandler, Response } from 'express';

import User from 'models/User';

import { ErrorResponse, SuccessResponse } from 'helpers/response';

export const authenticateController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.session.userId) throw new ErrorResponse('Unauthorized', 401);

    const user = await User.findById(req.session.userId);
    if (!user) throw new ErrorResponse('Unauthorized', 401);

    const userObject = user.toObject();
    delete userObject._id;
    delete userObject.createdAt;
    delete userObject.password;
    delete userObject.updatedAt;
    const response = new SuccessResponse(userObject, 'Authenticated!', 200);

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
