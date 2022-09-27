import { Document, model, Schema } from 'mongoose';

import { isEmail } from 'helpers/validator/string';

export interface IUser extends Document {
  username: string;
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
  avatar?: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
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
        validator: isEmail,
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
  },
  { timestamps: true },
);

export default model<IUser>('User', UserSchema);
