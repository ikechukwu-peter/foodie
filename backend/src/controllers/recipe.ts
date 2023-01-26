import { UploadedFile } from "express-fileupload";
import { Request, Response } from "express";
import { Recipe } from "../model";
import { validateImageType } from "../utils";
import { upload } from "../cloudinary";

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find({}).exec();
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while processing your request" });
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id).exec();
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while processing your request" });
  }
};

export const getUserRecipes = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const recipe = await Recipe.find({ userId: userId }).exec();
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while processing your request" });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  if (!req?.user) {
    return res.status(422).json({ error: "Unable to process your request." });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }

  const image = req.files.image as UploadedFile;
  if (!validateImageType(image)) {
    return res.status(422).json({ error: "Image type not supported." });
  }

  //if you wan to store to disk, you use this
  // const fileName = Date.now() + image.name;
  // const pathToFIle = path.resolve(
  //   __dirname + "../../../assets/" + Date.now() + image.name
  // );

  // image.mv(pathToFIle, (err) => {
  //   if (err) {
  //     return res.status(500).json({ error: err?.error });
  //   }
  // });

  //calling cloudinary
  let imageUrl: string;
  let imageId: string;

  try {
    const res = await upload(image.data, "Images");
    imageUrl = res.secure_url;
    imageId = res.public_id;
  } catch (error: any) {
    console.log(error, "CLOUDINARY ERROR");
    return res.status(400).json({ error: error?.error });
  }

  const {
    title,
    note,
    description,
    ingredients,
  }: { title: string; note: string; description: string; ingredients: string } =
    req.body;

  try {
    const recipe = await Recipe.create({
      userId: req.user,
      title,
      note,
      description,
      ingredients,
      image: {
        url: imageUrl,
        id: imageId,
      },
    });
    return res.status(200).json({ message: "created successfully", ...recipe });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occured while processing your request" });
  }
};
