"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = __importDefault(require("@joi/date"));
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.extend(date_1.default);
