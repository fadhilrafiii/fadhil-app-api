"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendedActivities = exports.getActivityScore = exports.getActivityFilterByTypeFromQuery = exports.getTodayActivities = void 0;
const Activity_1 = require("./../../models/Activity");
const Activity_2 = require("../../models/Activity");
const datetime_1 = __importDefault(require("../datetime"));
const getTodayActivities = (activities) => {
    return activities.filter((activity) => (0, datetime_1.default)(activity.schedule).isToday() || (0, datetime_1.default)(activity.deadline).isToday());
};
exports.getTodayActivities = getTodayActivities;
const getActivityFilterByTypeFromQuery = (query) => {
    let filter = {};
    const startOfToday = (0, datetime_1.default)().startOf('day');
    const endOfToday = (0, datetime_1.default)().endOf('day');
    switch (query.type) {
        case 'Today':
            filter = Object.assign(Object.assign({}, filter), { $or: [
                    { schedule: { $gte: startOfToday, $lt: endOfToday } },
                    { deadline: { $gte: startOfToday, $lt: endOfToday } },
                ] });
            break;
        case 'Habits':
            filter = Object.assign(Object.assign({}, filter), { isHabit: true });
            break;
    }
    return filter;
};
exports.getActivityFilterByTypeFromQuery = getActivityFilterByTypeFromQuery;
// score = Urgency * 3 + Difficulty * 2 + (31 - diff today to deadline) *
const getActivityScore = (activity) => Activity_1.ActivityDifficultyValue[activity.difficulty] * 3 +
    Activity_2.ActivityPriorityValue[activity.priority] * 2 +
    (activity.deadline && (0, datetime_1.default)().isBefore(activity.deadline)
        ? 31 - (0, datetime_1.default)().diff(activity.deadline, 'day', true)
        : 0);
exports.getActivityScore = getActivityScore;
const getRecommendedActivities = (activities) => activities
    .sort((a, b) => {
    const scoreA = (0, exports.getActivityScore)(a);
    const scoreB = (0, exports.getActivityScore)(b);
    return scoreB - scoreA;
})
    .slice(0, 7);
exports.getRecommendedActivities = getRecommendedActivities;
