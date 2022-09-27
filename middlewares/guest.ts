import { NextFunction, Request, RequestHandler, Response } from 'express';

import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import User, { IUser } from 'models/User';

import { ErrorResponse } from 'helpers/response';

export const isGuest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.header('X-Fadhil-Authorization') || '';
    const token = bearerToken.split(' ');

    if (bearerToken) {
      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) throw new ErrorResponse("Secret key not found, can't check password!", 500);
      jwt.verify(
        token[1],
        secretKey,
        undefined,
        async (err: VerifyErrors | null, result?: JwtPayload | string) => {
          if (err) next();

          const user = await User.findById((result as IUser)?._id);

          if (!user) next();

          const response = new ErrorResponse('You are already logged in', 403);
          res.status(response.status).json(response);
        },
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};
