import User from "@/models/user.model";
import { hash } from "bcrypt";
import { generateToken } from "@/helpers/token";
import { compare } from "bcrypt";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }
    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ code: 400, message: "Password is incorrect" });
    }
    user.password = undefined;
    const token = generateToken({ id: user._id });
    return res.status(200).json({
      code: 200,
      token,
    });
  } catch (error) {}
};
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const isExisted = await User.findOne({ email });
    if (isExisted) {
      return res
        .status(400)
        .json({ code: 400, message: "Email already existed" });
    }
    const hashedPassword = await hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    user.password = undefined;
    const token = generateToken({ id: user._id });
    return res.status(201).json({
      code: 201,
      token,
    });
  } catch (error) {}
};

export const loginGoogleCallback = async (req, res) => {
  try {
    const user = req.user;

    console.log("User:", user);

    const existedUser = await User.findOne({
      email: user.email,
    });
    
    
    if (!existedUser) {
      const newUser = new User(user);
      await newUser.save();
      const token = generateToken({ id: newUser._id });
      const androidAppRedirectUri = `music-app://callback?token=${token}`;
      return res.redirect(androidAppRedirectUri);
    }

    const token = generateToken({ id: user._id });

    const androidAppRedirectUri = `music-app://callback?token=${token}`;
    return res.redirect(androidAppRedirectUri);

  } catch (error) {
    console.log("Lỗi lồn què gì vậy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
