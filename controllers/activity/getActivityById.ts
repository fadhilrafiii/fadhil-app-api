import { NextFunction, Request, RequestHandler, Response } from 'express';

import Activity from 'models/Activity';

import { ErrorResponse, SuccessResponse } from 'helpers/response';

export const getActivityById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id = req.params.id;

    const activity = await Activity.findOne({ _id, userId: req.user._id });
    if (!activity) throw new ErrorResponse(`Activity ${_id} not found!`, 404);

    const response = new SuccessResponse(activity?.toObject(), `Get Activity ${_id} Success!`);

    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
