import { Request, Response } from "express";
import { Recipe } from "../model";

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find().exec();
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || id.length < 12) {
    res.status(400).json({ message: "Invalid or Missing recipe id" });
  }
  try {
    const recipe = await Recipe.findById(req.params.id).exec();
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};

export const getUserRecipes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = "j";
  //   const { user } = req.user;
  if (!id || id.length < 12) {
    res.status(400).json({ message: "Invalid or Missing recipe id" });
  }
  try {
    const recipe = await Recipe.find({ userId: userId }).exec();
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  const { title, note, description, ingredients, image } = req.body;
  //   const { user } = req.user;
  const userId = 3;

  if (!title || !note || !description || !ingredients || image) {
    res.status(400).json({ message: "Please fill in the missing fields" });
  }

  try {
    const recipe = await Recipe.create({
      userId: userId,
      title,
      note,
      description,
      ingredients,
      image,
    });
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};
