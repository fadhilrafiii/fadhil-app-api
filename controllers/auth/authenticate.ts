import { NextFunction, Request, RequestHandler, Response } from 'express';

import Joi from 'joi';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import User, { IUser } from 'models/User';

import { ErrorResponse, SuccessResponse } from 'helpers/response';

import { JWT_EXPIRY_SECONDS } from 'constants/auth';

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

        if (!user) next(new ErrorResponse('User not found! Please try re-login', 401));

        const response = new SuccessResponse({ token }, 'Authenticate success!');
        res.cookie('token', token, { maxAge: JWT_EXPIRY_SECONDS * 1000 });
        res.status(response.status).json(response);
      },
    );
  } catch (error) {
    next(error);
  }
};
