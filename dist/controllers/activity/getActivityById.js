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
exports.getActivityById = void 0;
const Activity_1 = __importDefault(require("../../models/Activity"));
const response_1 = require("../../helpers/response");
const getActivityById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const activity = yield Activity_1.default.findOne({ _id, userId: req.user._id });
        if (!activity)
            throw new response_1.ErrorResponse(`Activity ${_id} not found!`, 404);
        const response = new response_1.SuccessResponse(activity === null || activity === void 0 ? void 0 : activity.toObject(), `Get Activity ${_id} Success!`);
        res.status(response.status).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.getActivityById = getActivityById;
