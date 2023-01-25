import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../model";
import { CONSTANTS } from "../constants";

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRESIN as string,
  });
};

/**
 * 
 * @param req {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
 * @param res 
 * @returns 
 */

export const registerOrLogin = async (req: Request, res: Response) => {
  console.log(req.body);
  if (!req?.body?.email || !req.body?.password) {
    return res.status(400).json({ message: "Please provide missing fields" });
  }
  const { email, password } = req.body;
  try {
    const _user = await User.findOne({ email }).exec();
    console.log(_user, "USR");

    if (_user) {
      if (!(await bcrypt.compare(_user?.password as string, password))) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const token = signToken(_user?._id as unknown as string);
      return res.status(200).json({ data: { token, email } });
    }
    const newUser = await User.create({
      email,
      password: await bcrypt.hash(password, CONSTANTS.SALT),
    });
    const token = signToken(newUser?._id as unknown as string);
    return res.status(201).json({ data: { token, email: newUser?.email } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occured while processing your request" });
  }
};
