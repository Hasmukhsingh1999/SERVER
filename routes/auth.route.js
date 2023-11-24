import express from "express";
import User from "../models/user.model.js";
import { login, logout, userRegister } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", userRegister);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
