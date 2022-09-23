import { NextFunction, Request, RequestHandler, Response } from 'express';

import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import User, { IUser } from 'models/User';

import { ErrorResponse, SuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

import { JWT_EXPIRY_SECONDS } from 'constants/auth';

const loginSchema = Joi.object()
  .keys({
    username: Joi.string(),
    email: Joi.string(),
    password: Joi.string().min(6).required(),
  })
  .or('username', 'email')
  .label('Request body');

export const loginController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password }: IUser = await validateRequest<IUser>(
      loginSchema,
      req.body,
    );

    const user = (
      await User.findOne({
        $or: [{ email }, { username }],
      })
    )?.toObject();

    if (!user) throw new ErrorResponse('User not found, wrong username!', 400);

    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) throw new ErrorResponse('Wrong password!', 400);

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new ErrorResponse("Secret key not found, can't check password!", 500);

    const token = jwt.sign(user, secretKey, {
      algorithm: 'HS256',
      expiresIn: JWT_EXPIRY_SECONDS,
    });
    const response = new SuccessResponse({ token }, 'Login success!');

    res.cookie('token', token, { maxAge: JWT_EXPIRY_SECONDS * 1000 });
    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
