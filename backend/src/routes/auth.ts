import express from "express";

import { registerOrLogin } from "./../controllers/auth";

const router = express.Router();

router.post("/join", registerOrLogin);

export { router };
