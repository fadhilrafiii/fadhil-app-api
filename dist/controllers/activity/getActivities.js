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
exports.getActivities = void 0;
const Activity_1 = __importDefault(require("../../models/Activity"));
const datetime_1 = __importDefault(require("../../helpers/datetime"));
const response_1 = require("../../helpers/response");
const validator_1 = __importDefault(require("../../helpers/validator"));
const request_1 = require("../../helpers/validator/request");
const getActivityQuerySchema = validator_1.default.object().keys({
    month: validator_1.default.number().min(0).max(11),
    year: validator_1.default.number(),
});
const getActivities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield (0, request_1.validateRequest)(getActivityQuerySchema, req.query);
        const filter = {};
        if (query.year || query.month) {
            const now = (0, datetime_1.default)();
            const schedule = (0, datetime_1.default)()
                .year(parseInt(query.year) || now.year())
                .month(parseInt(query.month) || now.month());
            const startTime = schedule.startOf(query.month ? 'month' : 'year').toISOString();
            const endTime = schedule.endOf(query.month ? 'month' : 'year').toISOString();
            filter.schedule = { $gte: startTime, $lt: endTime };
        }
        const activities = yield Activity_1.default.find(Object.assign(Object.assign({}, filter), { userId: req.session.userId })).sort('schedule');
        const response = new response_1.SuccessResponse(activities, 'Get Activities Success!');
        res.status(response.status).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.getActivities = getActivities;
