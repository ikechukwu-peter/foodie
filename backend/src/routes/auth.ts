import passport from "passport";
import express from "express";
const router = express.Router();

router.post("/join", passport.authenticate("jwt", { session: false }));

export { router };
