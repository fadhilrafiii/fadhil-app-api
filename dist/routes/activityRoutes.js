"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_1 = require("../controllers/activity");
const activityRoutes = express_1.default.Router();
activityRoutes.post('/', activity_1.createActivity);
activityRoutes.get('/', activity_1.getActivities);
activityRoutes.get('/by-type', activity_1.getActivitiesByType);
activityRoutes.get('/:id', activity_1.getActivityById);
activityRoutes.put('/:id/toggle-status', activity_1.toggleActivityStatus);
activityRoutes.put('/:id', activity_1.updateActivity);
activityRoutes.delete('/:id', activity_1.deleteActivity);
exports.default = activityRoutes;
