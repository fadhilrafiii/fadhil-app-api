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
exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/User"));
const response_1 = require("../../helpers/response");
const validator_1 = __importDefault(require("../../helpers/validator"));
const request_1 = require("../../helpers/validator/request");
const loginSchema = validator_1.default.object().keys({
    username: validator_1.default.string().required(),
    password: validator_1.default.string().min(6).required(),
});
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = yield (0, request_1.validateRequest)(loginSchema, req.body);
        const user = yield User_1.default.findOne({
            $or: [{ email: username }, { username }],
        });
        if (!user)
            throw new response_1.ErrorResponse('User not found, wrong username!', 400);
        const isPasswordTrue = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordTrue)
            throw new response_1.ErrorResponse('Wrong password!', 400);
        req.session.userId = user._id;
        req.session.save();
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject._id;
        delete userObject.createdAt;
        delete userObject.updatedAt;
        const response = new response_1.SuccessResponse(userObject, 'Login success!');
        res.status(response.status).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.loginController = loginController;
