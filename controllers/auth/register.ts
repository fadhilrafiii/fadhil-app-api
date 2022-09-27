import { NextFunction, Request, RequestHandler, Response } from 'express';

import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import User from 'models/User';

import { ErrorResponse, SuccessResponse } from 'helpers/response';
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

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new ErrorResponse("Secret key not found, can't check password!", 500);

    const token = jwt.sign(newUser.toObject(), secretKey);
    const response = new SuccessResponse({ token }, 'Registration Success!');

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
