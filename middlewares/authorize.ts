import { NextFunction, Request, RequestHandler, Response } from 'express';

import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import User, { IUser } from 'models/User';

import { ErrorResponse } from 'helpers/response';

const authorize: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.header('X-Fadhil-Authorization');
    if (!bearerToken) throw new ErrorResponse('Unauthorized, No token given!', 401);

    const [prefix, token] = bearerToken.split(' ');
    if (prefix !== 'Bearer' || !token)
      throw new ErrorResponse('Unauthorized, Not a Bearer Token!', 401);

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

        req.user = user;
        next();
      },
    );
  } catch (error) {
    next(error);
  }
};

export default authorize;
