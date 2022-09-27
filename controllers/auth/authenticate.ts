import { NextFunction, Request, RequestHandler, Response } from 'express';

import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import User, { IUser } from 'models/User';

import { ErrorResponse, SuccessResponse } from 'helpers/response';

export const authenticateController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('X-Fadhil-Token');
    if (!token) throw new ErrorResponse('No token given!', 400);

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new ErrorResponse("Secret key not found, can't check password!", 500);

    return jwt.verify(
      token,
      secretKey,
      undefined,
      async (err: VerifyErrors | null, result?: JwtPayload | string) => {
        if (err) next(new ErrorResponse('Token invalid or expired! Please re-login', 401));

        const user = await User.findById((result as IUser)?._id);

        if (!user) throw new ErrorResponse('User not found! Please try re-login', 401);

        const userObject = user.toObject();
        delete userObject.password;
        delete userObject._id;
        delete userObject.createdAt;
        delete userObject.updatedAt;
        const response = new SuccessResponse(userObject, 'Authenticate success!');
        res.status(response.status).json(response);
      },
    );
  } catch (error) {
    next(error);
  }
};
