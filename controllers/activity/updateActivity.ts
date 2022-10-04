import { NextFunction, Request, RequestHandler, Response } from 'express';

import Joi from 'joi';

import Activity, { ActivityDifficultyEnum, ActivityPriorityEnum } from 'models/Activity';

import { SuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

const updateActivitySchema = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid(...Object.values(ActivityPriorityEnum)),
  deadline: Joi.date().allow(null),
  difficulty: Joi.string().valid(...Object.values(ActivityDifficultyEnum)),
  schedule: Joi.date().required(),
  // prerequisites: Joi.array().items(Joi.string()), || Not handled yet!!!
  subTask: Joi.array().items(Joi.string()),
  isHabit: Joi.boolean(),
});

export const updateActivity: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id = req.params.id;
    const payload = await validateRequest(updateActivitySchema, req.body);
    const updatedActivity = await Activity.findOneAndUpdate({ _id }, payload, {
      returnOriginal: false,
    });

    const response = new SuccessResponse(updatedActivity, `Update Activity ${_id} Success!`);
    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
