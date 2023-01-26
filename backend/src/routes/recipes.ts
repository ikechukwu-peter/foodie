import passport from "passport";
import express from "express";
import {
  getAllRecipes,
  getRecipe,
  getUserRecipes,
  createRecipe,
} from "./../controllers/recipe";
import { validate } from "../middleware";
import {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
} from "../schema-validations";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllRecipes
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  validate(createRecipeSchema),
  createRecipe
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  validate(getUserRecipesSchema),
  getUserRecipes
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validate(getRecipeSchema),
  getRecipe
);

export { router };
