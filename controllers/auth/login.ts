import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import User from 'models/User';

import { getErrorResponse, getSuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

const loginSchema = Joi.object()
  .keys({
    username: Joi.string(),
    email: Joi.string(),
    password: Joi.string().required(),
  })
  .or('username', 'email');

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = await validateRequest(loginSchema, req.body);

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) throw 'User not found!';

    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) throw 'Wrong password!';

    const secretKey: string = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ _id: user._id }, secretKey);

    return getSuccessResponse(res, { token });
  } catch (error: any) {
    return getErrorResponse(res, error);
  }
};
