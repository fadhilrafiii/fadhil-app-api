"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGuest = void 0;
const response_1 = require("../helpers/response");
const isGuest = (req, res, next) => {
    try {
        if (!req.session.userId)
            next();
        const response = new response_1.SuccessResponse(null, 'You have already logged in!', 301);
        res.status(response.status).json(response);
    }
    catch (err) {
        next(err);
    }
};
exports.isGuest = isGuest;
