import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import passport from "passport";
import cors from "cors";
import fileUpload from "express-fileupload";

import { authRouter, recipeRouter } from "./routes";
import { authenticate } from "./config";

const app: Application = express();
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

app.use(passport.initialize());

// Passport Config
authenticate(passport);

//initialize DB call
const runDB = async () => {
  connect(process.env.MONGODB_URI as string)
    .then(() => console.log("DB connected successfully"))
    .catch(() => console.log("DB not connected"));
};

//start DB
runDB();

app.use("/recipe", recipeRouter);
app.use("/auth", authRouter);
app.all("*", async (req: Request, res: Response) => {
  console.log(req.protocol);
  res.status(404).json({
    message: "The route you requested is not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
