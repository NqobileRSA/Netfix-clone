import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // check if all fields are filled
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // verify if email format
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email. 'Example@gmail.com'",
      });
    }

    // ensure password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters.",
      });
    }

    // check if user exists
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists." });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // create the user
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "New user successfully created.",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error("Error in the signup controller");
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if there is no login data
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });

    // if user not found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password." });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Login successfull.",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error("Error in login controller");
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Error in logout controller.");
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error,
    });
  }
};

export { signup, login, logout };
