import { Response } from 'express';

export const getSuccessResponse = (
  res: Response,
  data: any,
  message = 'Success fetching API',
  status = 200,
) => {
  return res.status(status).json({ data, message, status });
};

export const getErrorResponse = (
  res: Response,
  error: any,
  message = 'Failed fetching API',
  status = 400,
) => {
  return res.status(status).json({ error, message, status });
};
