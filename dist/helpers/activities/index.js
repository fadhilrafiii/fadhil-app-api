"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayActivities = void 0;
const datetime_1 = __importDefault(require("../datetime"));
const getTodayActivities = (activities) => {
    return activities.filter((activity) => (0, datetime_1.default)(activity.schedule).isToday() || (0, datetime_1.default)(activity.deadline).isToday());
};
exports.getTodayActivities = getTodayActivities;
