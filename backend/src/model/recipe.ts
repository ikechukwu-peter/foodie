import { Schema, model, SchemaTypes } from "mongoose";

interface IImage {
  url: string;
  id: string;
}

// 1. Create an interface representing a document in MongoDB.
interface IRecipe {
  title: string;
  description: string;
  note: string;
  ingredients: string;
  image: IImage;
  user?: string;
}

// 2. Create a Schema corresponding to the document interface.
const recipeSchema = new Schema<IRecipe>(
  {
    user: { type: SchemaTypes.ObjectId, ref: "User" },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true, index: true },
    note: { type: String, index: true },
    ingredients: { type: String, required: true, index: true },
    image: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3. Create a Model.
export const Recipe = model<IRecipe>("Recipe", recipeSchema);
