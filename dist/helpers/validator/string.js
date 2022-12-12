"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
const isEmail = (email) => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
};
exports.isEmail = isEmail;
