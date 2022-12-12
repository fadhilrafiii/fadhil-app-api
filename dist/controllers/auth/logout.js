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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
const response_1 = require("../../helpers/response");
const logoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((err) => {
            if (err)
                next(new response_1.ErrorResponse('Failed to logout', 400));
        });
        res.clearCookie('sid');
        const response = new response_1.SuccessResponse(null, 'Logout success', 200);
        res.status(response.status).json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.logoutController = logoutController;
