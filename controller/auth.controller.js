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
    const isUser = await User.findOne({email});
    if(isUser){
      res.status(409).json({message:"User already existed!"})
    }
    generateToken(res, newUser._id);
    await newUser.save();
    res.status(200).json({ message: "User created", newUser });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const login = async () => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// LOGOUT
export const logout = async () => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
