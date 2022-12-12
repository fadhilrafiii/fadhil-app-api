"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authRoutes = express_1.default.Router();
authRoutes.post('/authenticate', auth_1.authenticateController);
authRoutes.post('/login', auth_1.loginController);
authRoutes.post('/logout', auth_1.logoutController);
authRoutes.post('/register', auth_1.registerController);
exports.default = authRoutes;
