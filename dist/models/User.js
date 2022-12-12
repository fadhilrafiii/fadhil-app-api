"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const string_1 = require("../helpers/validator/string");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: string_1.isEmail,
        },
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
