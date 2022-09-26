import { NextFunction, Request, RequestHandler, Response } from 'express';

import Activity from 'models/Activity';

import { SuccessResponse } from 'helpers/response';

export const getActivities: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const activities = await Activity.find({ userId: req.user._id });

    const response = new SuccessResponse(activities, 'Get Activities Success!');

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
