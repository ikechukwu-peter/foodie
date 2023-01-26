import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { Request, Response } from "express";
import { Recipe } from "../model";
import { validateImageType } from "../utils";
import { upload } from "../cloudinary";

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find({}).exec();
    res.status(200).json({ data: recipes });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || id.length < 24) {
    res.status(400).json({ message: "Invalid or Missing recipe id" });
  }
  try {
    const recipe = await Recipe.findById(req.params.id).exec();
    res.status(200).json({ data: recipe });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};

export const getUserRecipes = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId || userId.length < 24) {
    res.status(400).json({ message: "Invalid or Missing  id" });
  }
  try {
    const recipe = await Recipe.find({ userId: userId }).exec();
    res.status(200).json({ data: recipe });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  await Recipe.deleteMany({});
  if (!req?.user) {
    return res.status(422).json({ message: "Unable to process your request." });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const image = req.files.image as UploadedFile;
  if (!validateImageType(image)) {
    return res.status(422).json({ message: "Image type not supported." });
  }
  // const fileName = Date.now() + image.name;
  // const pathToFIle = path.resolve(
  //   __dirname + "../../../assets/" + Date.now() + image.name
  // );

  // image.mv(pathToFIle, (err) => {
  //   if (err) {
  //     return res.status(500).json({ message: err?.message });
  //   }
  // });

  if (!req.body || Object.keys(req.body).length < 4) {
    return res
      .status(400)
      .json({ message: "Please fill in the missing fields" });
  }

  //calling cloudinary
  // const { secure_url, public_id }: UploadApiResponse = await upload(
  //   image,
  //   "Images"
  // ).catch((err: UploadApiErrorResponse) => {
  //   return res.status(400).json({ message: err?.message });
  // });

  const { title, note, description, ingredients } = req.body;

  try {
    const recipe = await Recipe.create({
      userId: req.user,
      title,
      note,
      description,
      // ingredients,
      // image: {
      //   url: secure_url,
      //   id: public_id,
      // },
    });
    return res.status(200).json({ data: recipe });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};
