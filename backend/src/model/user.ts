import { Schema, model, models, Model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  _id?: string;
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    autoIndex: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3. Create a Model.
export const User =
  (models.User as Model<IUser>) || model<IUser>("User", userSchema);
