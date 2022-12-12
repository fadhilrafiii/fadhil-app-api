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
exports.deleteActivity = void 0;
const Activity_1 = __importDefault(require("../../models/Activity"));
const response_1 = require("../../helpers/response");
const deleteActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const { deletedCount } = yield Activity_1.default.deleteOne({
            _id,
            userId: req.session.userId,
        });
        let response;
        if (deletedCount === 1)
            response = new response_1.SuccessResponse(null, `Get Activity ${_id} Success!`, 200);
        else
            response = new response_1.SuccessResponse(null, `No Activity deleted, Activity ${_id} doesn't exist already!`, 201);
        res.status(response.status).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteActivity = deleteActivity;
