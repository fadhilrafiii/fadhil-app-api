import { NextFunction, Request, RequestHandler, Response } from 'express';

import Joi from 'joi';

import Activity, { ActivityDifficultyEnum, ActivityPriorityEnum } from 'models/Activity';

import { generateActivityColors } from 'helpers/colors';
import { SuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

const createActivitySchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  priority: Joi.string()
    .valid(...Object.values(ActivityPriorityEnum))
    .required(),
  deadline: Joi.date().allow(null),
  difficulty: Joi.string()
    .valid(...Object.values(ActivityDifficultyEnum))
    .required(),
  schedule: Joi.date().required(),
  prerequisites: Joi.array().items(Joi.string()),
  subTask: Joi.array().items(Joi.string()),
  isHabit: Joi.boolean().default(false),
});

export const createActivity: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = await validateRequest(createActivitySchema, req.body);
    const noteColor = generateActivityColors();

    const newActivity = new Activity({ ...payload, userId: req.session.userId, color: noteColor });
    await newActivity.save();

    const response = new SuccessResponse(newActivity, 'Create Activity Success!');
    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
