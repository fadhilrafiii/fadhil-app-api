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
exports.registerController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/User"));
const response_1 = require("../../helpers/response");
const validator_1 = __importDefault(require("../../helpers/validator"));
const request_1 = require("../../helpers/validator/request");
const registerSchema = validator_1.default.object().keys({
    username: validator_1.default.string().required(),
    email: validator_1.default.string().email().required(),
    firstName: validator_1.default.string().required(),
    lastName: validator_1.default.string(),
    password: validator_1.default.string().required(),
    avatar: validator_1.default.string().allow('', null),
});
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield (0, request_1.validateRequest)(registerSchema, req.body);
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, salt);
        const newUser = new User_1.default(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
        yield newUser.save();
        req.session.userId = newUser._id;
        const userObject = newUser.toObject();
        delete userObject.password;
        delete userObject._id;
        delete userObject.createdAt;
        delete userObject.updatedAt;
        const response = new response_1.SuccessResponse(userObject, 'Registration Success!');
        res.status(response.status).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.registerController = registerController;
