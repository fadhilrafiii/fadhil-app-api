"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../helpers/response");
const errorHandler = (error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    console.error('Path: ', req.path);
    console.error('Error: ', error);
    if (error instanceof TypeError || error instanceof response_1.ErrorResponse) {
        if (error instanceof TypeError)
            res.status(500).json(error);
        else
            res.status(error.status).json(error);
    }
    else {
        // This is handler for Mongo Error
        const mongoError = new response_1.ErrorResponse(error.message, 400);
        res.status(400).json(mongoError);
    }
};
exports.default = errorHandler;
