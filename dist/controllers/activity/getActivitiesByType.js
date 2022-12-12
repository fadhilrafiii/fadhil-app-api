"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivitiesByType = void 0;
const Activity_1 = __importDefault(require("../../models/Activity"));
const activity_1 = require("../../helpers/activity");
const response_1 = require("../../helpers/response");
const validator_1 = __importDefault(require("../../helpers/validator"));
const request_1 = require("../../helpers/validator/request");
const getActivityQuerySchema = validator_1.default.object().keys({
    type: validator_1.default.string().valid('Today', 'Recommended', 'Habits'),
});
const getActivitiesByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield (0, request_1.validateRequest)(getActivityQuerySchema, req.query);
        let activities = [];
        if (query.type === 'Recommended') {
            activities = yield Activity_1.default.find({ userId: req.session.userId });
            activities = (0, activity_1.getRecommendedActivities)(activities);
        }
        else {
            const filter = (0, activity_1.getActivityFilterByTypeFromQuery)(query);
            activities = yield Activity_1.default.find(Object.assign(Object.assign({}, filter), { userId: req.session.userId })).sort('-updatedAt');
        }
        const response = new response_1.SuccessResponse(activities, 'Get Activities Success!');
        res.status(response.status).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.getActivitiesByType = getActivitiesByType;
