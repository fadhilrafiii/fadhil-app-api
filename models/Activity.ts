import { Document, HydratedDocument, model, ObjectId, Schema } from 'mongoose';

export enum ActivityPriorityEnum {
  VERY_HIGH = 'Very High',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  VERY_LOW = 'Very Low',
}

export enum ActivityDifficultyEnum {
  VERY_HARD = 'Very Hard',
  HARD = 'Hard',
  MEDIUM = 'Medium',
  EASY = 'Easy',
  VERY_EASY = 'Very Easy',
}

export const ActivityPriorityValue: Record<string, number> = {
  'Very High': 5,
  High: 4,
  Medium: 3,
  Low: 2,
  'Very Low': 1,
};

export const ActivityDifficultyValue: Record<string, number> = {
  'Very Hard': 5,
  Hard: 4,
  Medium: 3,
  Easy: 2,
  'Very Easy': 1,
};

export interface IActivity extends Document {
  name: string;
  description?: string;
  priority: string;
  deadline?: Date;
  difficulty: string;
  schedule?: Date;
  prerequisites: string[];
  subTask: string[];
  isHabit?: boolean;
  isDone?: boolean;
  color?: string;
  userId: string;
}

const ActivitySchema: Schema<IActivity> = new Schema<IActivity>(
  {
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
      required: false,
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
        type: Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
    subTask: [{ type: String }],
    color: {
      type: String,
      required: false,
    },
    userId: {
      type: Schema.Types.Mixed,
      ref: 'User',
    },
  },
  { timestamps: true },
);

ActivitySchema.pre<HydratedDocument<IActivity>>('findOne', function (this: Document<ObjectId>) {
  this.populate('prerequisites');
});

export default model<IActivity>('Activity', ActivitySchema);
