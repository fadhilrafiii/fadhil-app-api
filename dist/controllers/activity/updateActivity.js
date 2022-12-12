"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateActivity = void 0;
const Activity_1 = __importStar(require("../../models/Activity"));
const response_1 = require("../../helpers/response");
const validator_1 = __importDefault(require("../../helpers/validator"));
const request_1 = require("../../helpers/validator/request");
const updateActivitySchema = validator_1.default.object().keys({
    name: validator_1.default.string(),
    description: validator_1.default.string(),
    priority: validator_1.default.string().valid(...Object.values(Activity_1.ActivityPriorityEnum)),
    deadline: validator_1.default.date().allow(null),
    difficulty: validator_1.default.string().valid(...Object.values(Activity_1.ActivityDifficultyEnum)),
    schedule: validator_1.default.date().required(),
    // prerequisites: Joi.array().items(Joi.string()), || Not handled yet!!!
    subTask: validator_1.default.array().items(validator_1.default.string()),
    isHabit: validator_1.default.boolean(),
});
const updateActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const payload = yield (0, request_1.validateRequest)(updateActivitySchema, req.body);
        const updatedActivity = yield Activity_1.default.findOneAndUpdate({ _id }, payload, {
            returnOriginal: false,
        });
        const response = new response_1.SuccessResponse(updatedActivity, `Update Activity ${_id} Success!`);
        res.status(response.status).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.updateActivity = updateActivity;
