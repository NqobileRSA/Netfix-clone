import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "New user successfully created.",
      user: {
        ...newUser._doc,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

const signin = (req, res) => {
  res.send("signin");
};

const signout = (req, res) => {
  res.send("signout");
};

export { signup, signin, signout };
