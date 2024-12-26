import User from "@/models/user.model";
import { hash } from "bcrypt";
import { generateToken } from "@/helpers/token";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
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

export const loginGoogleCallback = (req, res) => {
  try {
    const user = req.user;
    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.emails[0].value,
        name: user.displayName,
        picture: user.photos[0].value,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Trả JWT token cho ứng dụng Android
    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.emails[0].value,
        name: user.displayName,
        picture: user.photos[0].value,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
