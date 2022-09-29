import { NextFunction, Request, RequestHandler, Response } from 'express';

import bcrypt from 'bcrypt';
import Joi from 'joi';

import User from 'models/User';

import { SuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  password: Joi.string().required(),
  avatar: Joi.string().allow('', null),
});

export const registerController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = await validateRequest(registerSchema, req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    const newUser = new User({ ...payload, password: hashedPassword });
    await newUser.save();

    req.session.userId = newUser._id;

    const userObject = newUser.toObject();
    delete userObject.password;
    delete userObject._id;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    const response = new SuccessResponse(userObject, 'Registration Success!');

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
