import passport from "passport";
import express from "express";
import {
  getAllRecipes,
  getRecipe,
  getUserRecipes,
  createRecipe,
} from "./../controllers/recipe";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllRecipes
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  getUserRecipes
);
router.get("/:id", passport.authenticate("jwt", { session: false }), getRecipe);

export { router };
