"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
class SuccessResponse {
    constructor(data, message = '', status = 200) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse {
    constructor(message, status = 500) {
        this.message = message;
        this.status = status;
    }
}
exports.ErrorResponse = ErrorResponse;
