import { NextFunction, Request, RequestHandler, Response } from 'express';

import Activity from 'models/Activity';

import { SuccessResponse } from 'helpers/response';

export const deleteActivity: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id = req.params.id;

    const { deletedCount }: { deletedCount: number } = await Activity.deleteOne({
      _id,
      userId: req.session.userId,
    });

    let response;
    if (deletedCount === 1)
      response = new SuccessResponse(null, `Get Activity ${_id} Success!`, 200);
    else
      response = new SuccessResponse(
        null,
        `No Activity deleted, Activity ${_id} doesn't exist already!`,
        201,
      );
    res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
