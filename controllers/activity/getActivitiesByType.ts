import { NextFunction, Request, RequestHandler, Response } from 'express';

import Activity from 'models/Activity';

import { getActivityFilterByTypeFromQuery, getRecommendedActivities } from 'helpers/activity';
import { SuccessResponse } from 'helpers/response';
import Joi from 'helpers/validator';
import { validateRequest } from 'helpers/validator/request';

const getActivityQuerySchema = Joi.object().keys({
  type: Joi.string().valid('Today', 'Recommended', 'Habits'),
});

export const getActivitiesByType: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = await validateRequest(getActivityQuerySchema, req.query);

    let activities = [];
    if (query.type === 'Recommended') {
      activities = await Activity.find({ userId: req.session.userId });
      activities = getRecommendedActivities(activities);
    } else {
      const filter = getActivityFilterByTypeFromQuery(query);

      activities = await Activity.find({ ...filter, userId: req.session.userId }).sort(
        '-updatedAt',
      );
    }

    const response = new SuccessResponse(activities, 'Get Activities Success!');

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
