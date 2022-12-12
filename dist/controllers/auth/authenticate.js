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
exports.authenticateController = void 0;
const User_1 = __importDefault(require("../../models/User"));
const response_1 = require("../../helpers/response");
const authenticateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.userId)
            throw new response_1.ErrorResponse('Unauthorized', 401);
        const user = yield User_1.default.findById(req.session.userId);
        if (!user)
            throw new response_1.ErrorResponse('Unauthorized', 401);
        const userObject = user.toObject();
        delete userObject._id;
        delete userObject.createdAt;
        delete userObject.password;
        delete userObject.updatedAt;
        const response = new response_1.SuccessResponse(userObject, 'Authenticated!', 200);
        res.status(response.status).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.authenticateController = authenticateController;
