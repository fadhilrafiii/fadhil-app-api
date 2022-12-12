"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ErrorObject = void 0;
class ErrorObject {
    constructor(message, status = 500) {
        this.message = message;
        this.status = status;
    }
}
exports.ErrorObject = ErrorObject;
const errorHandler = (error, req, res, next) => {
    console.log('Path: ', req.path);
    console.error('Error: ', typeof error, error);
    if (error.status === 404 || error.status === 500)
        next(error);
    res.status(error.status).json(error);
};
exports.errorHandler = errorHandler;
