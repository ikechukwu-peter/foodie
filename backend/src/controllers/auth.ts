import { Request, Response } from "express";
import { User } from "../model";

export const registerOrLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const _user = await User.findOne({ email }).exec();
    if (_user) {
      //login
    }
    const newUser = await User.create({ email, password });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};
