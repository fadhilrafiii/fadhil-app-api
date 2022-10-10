import { NextFunction, Request, RequestHandler, Response } from 'express';

import { Console } from 'console';
import { Dayjs } from 'dayjs';

import Activity from 'models/Activity';

import dayjs from 'helpers/datetime';
import { SuccessResponse } from 'helpers/response';
import Joi from 'helpers/validator';
import { validateRequest } from 'helpers/validator/request';

const getActivityQuerySchema = Joi.object().keys({
  month: Joi.number().min(0).max(11),
  year: Joi.number(),
});

export const getActivities: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = await validateRequest(getActivityQuerySchema, req.query);
    const filter: Record<string, unknown> = {};

    if (query.year || query.month) {
      const now = dayjs();
      const schedule = dayjs()
        .year(parseInt(query.year as string) || now.year())
        .month(parseInt(query.month as string) || now.month());

      const startTime = schedule.startOf(query.month ? 'month' : 'year').toISOString();
      const endTime = schedule.endOf(query.month ? 'month' : 'year').toISOString();
      filter.schedule = { $gte: startTime, $lt: endTime };
    }

    const activities = await Activity.find({ ...filter, userId: req.session.userId }).sort(
      'schedule',
    );

    const response = new SuccessResponse(activities, 'Get Activities Success!');

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
