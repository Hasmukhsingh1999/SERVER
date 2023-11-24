import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generate.token.js";

// REGISTER
export const userRegister = async (req, res, next) => {
  try {
    const { email, password, ...others } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashPassword,
      ...others,
    });
    const isUser = await User.findOne({ email });
    if (isUser) {
      res.status(409).json({ message: "User already existed!" });
    }
    generateToken(res, newUser._id);
    await newUser.save();
    res.status(200).json({ message: "User created", newUser });
  } catch (error) {
    if (err.code === 11000) {
      res.status(400).json({
        message: "Duplicate key error. User with this email already exists",
      });
    }
    next(error);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user._id);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logout = async (req,res,next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
