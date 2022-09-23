import { NextFunction, Request, RequestHandler, Response } from 'express';

import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import User, { IUser } from 'models/User';

import { ErrorResponse, SuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

const loginSchema = Joi.object()
  .keys({
    username: Joi.string(),
    email: Joi.string(),
    password: Joi.string().required(),
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

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) throw 'User not found!';

    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) throw 'Wrong password!';

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new ErrorResponse('"Secret key not found, can\'t check password!', 500);

    const token = jwt.sign({ _id: user._id }, secretKey);
    const response = new SuccessResponse({ token }, 'Login success!');

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
