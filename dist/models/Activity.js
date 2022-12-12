"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityDifficultyValue = exports.ActivityPriorityValue = exports.ActivityDifficultyEnum = exports.ActivityPriorityEnum = void 0;
const mongoose_1 = require("mongoose");
var ActivityPriorityEnum;
(function (ActivityPriorityEnum) {
    ActivityPriorityEnum["VERY_HIGH"] = "Very High";
    ActivityPriorityEnum["HIGH"] = "High";
    ActivityPriorityEnum["MEDIUM"] = "Medium";
    ActivityPriorityEnum["LOW"] = "Low";
    ActivityPriorityEnum["VERY_LOW"] = "Very Low";
})(ActivityPriorityEnum = exports.ActivityPriorityEnum || (exports.ActivityPriorityEnum = {}));
var ActivityDifficultyEnum;
(function (ActivityDifficultyEnum) {
    ActivityDifficultyEnum["VERY_HARD"] = "Very Hard";
    ActivityDifficultyEnum["HARD"] = "Hard";
    ActivityDifficultyEnum["MEDIUM"] = "Medium";
    ActivityDifficultyEnum["EASY"] = "Easy";
    ActivityDifficultyEnum["VERY_EASY"] = "Very Easy";
})(ActivityDifficultyEnum = exports.ActivityDifficultyEnum || (exports.ActivityDifficultyEnum = {}));
exports.ActivityPriorityValue = {
    'Very High': 5,
    High: 4,
    Medium: 3,
    Low: 2,
    'Very Low': 1,
};
exports.ActivityDifficultyValue = {
    'Very Hard': 5,
    Hard: 4,
    Medium: 3,
    Easy: 2,
    'Very Easy': 1,
};
const ActivitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ActivityPriorityEnum,
    },
    deadline: {
        type: Date,
        required: false,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ActivityDifficultyEnum,
    },
    schedule: {
        type: Date,
        required: true,
    },
    isHabit: {
        type: Boolean,
        required: false,
    },
    isDone: {
        type: Boolean,
        required: false,
        default: false,
    },
    prerequisites: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Activity',
        },
    ],
    subTask: [{ type: String }],
    color: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose_1.Schema.Types.Mixed,
        ref: 'User',
    },
}, { timestamps: true });
ActivitySchema.pre('findOne', function () {
    this.populate('prerequisites');
});
exports.default = (0, mongoose_1.model)('Activity', ActivitySchema);
