import { NextFunction, Request, RequestHandler, Response } from 'express';

import bcrypt from 'bcrypt';
import Joi from 'joi';

import User, { IUser } from 'models/User';

import { ErrorResponse, SuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const loginController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password }: IUser = await validateRequest<IUser>(loginSchema, req.body);

    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });
    if (!user) throw new ErrorResponse('User not found, wrong username!', 400);

    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) throw new ErrorResponse('Wrong password!', 400);

    req.session.userId = user._id;
    req.session.save();

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject._id;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    const response = new SuccessResponse(userObject, 'Login success!');

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
