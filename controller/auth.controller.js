import User from "../models/user.model.js";

// REGISTER
export const userRegister = async (req, res, next) => {
  try {
    const { email, password, ...others } = req.body;
    const newUser = new User({
      email,
      password,
      ...others,
    });
    await newUser.save();
    res.status(200).json({ message: "User created", newUser });
  } catch (error) {
    next(error);
  }
  // console.log(req.body);
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
