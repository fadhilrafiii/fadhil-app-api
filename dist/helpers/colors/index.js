"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateActivityColors = void 0;
const colors_1 = require("../../constants/colors");
const generateActivityColors = () => colors_1.ACTIVITY_COLORS[Math.floor(Math.random() * colors_1.ACTIVITY_COLORS.length)];
exports.generateActivityColors = generateActivityColors;
