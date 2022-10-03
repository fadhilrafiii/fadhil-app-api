import { NextFunction, Request, RequestHandler, Response } from 'express';

import Joi from 'joi';

import Activity from 'models/Activity';

import { getTaskFilterFromQuery } from 'helpers/activity';
import { SuccessResponse } from 'helpers/response';
import { validateRequest } from 'helpers/validator/request';

const getActivityQuerySchema = Joi.object().keys({
  type: Joi.string().valid('Today', 'Recommended', 'Habits'),
});

export const getActivities: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = await validateRequest(getActivityQuerySchema, req.query);
    const filter = getTaskFilterFromQuery(query);

    const activities = await Activity.find({ ...filter, userId: req.session.userId }).sort(
      '-updatedAt',
    );

    const response = new SuccessResponse(activities, 'Get Activities Success!');

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
