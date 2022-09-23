import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Joi from 'joi';

import User from 'models/User';

import { getErrorResponse, getSuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  password: Joi.string().required(),
  avatar: Joi.string(),
});

export default registerSchema;

export const registerController = async (req: Request, res: Response) => {
  try {
    const payload = await validateRequest(registerSchema, req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    payload.password = hashedPassword;

    const newUser = new User(payload);
    await newUser.save();

    return getSuccessResponse(res, newUser);
  } catch (error) {
    return getErrorResponse(res, error);
  }
};
