import { NextFunction, Request, Response } from "express";
import { InferType } from "yup";
import {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
  joinSchema,
} from "../schema-validations";

//middleware to validate req data
export const validate =
  (
    schema:
      | InferType<
          | typeof createRecipeSchema
          | typeof getRecipeSchema
          | typeof getUserRecipesSchema
        >
      | typeof joinSchema
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      await schema.validate({
        ...(schema?.body && { body: req.body }),
        ...(schema?.query && { query: req.query }),
        ...(schema?.params && { params: req.params }),
      });
      return next();
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };
