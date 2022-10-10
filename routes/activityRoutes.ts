import express, { Router } from 'express';

import {
  createActivity,
  deleteActivity,
  getActivities,
  getActivitiesByType,
  getActivityById,
  toggleActivityStatus,
  updateActivity,
} from 'controllers/activity';

const activityRoutes: Router = express.Router();

activityRoutes.post('/', createActivity);
activityRoutes.get('/', getActivities);
activityRoutes.get('/by-type', getActivitiesByType);
activityRoutes.get('/:id', getActivityById);
activityRoutes.put('/:id/toggle-status', toggleActivityStatus);
activityRoutes.put('/:id', updateActivity);
activityRoutes.delete('/:id', deleteActivity);

export default activityRoutes;
