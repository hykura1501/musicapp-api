import User from "@/models/user.model";
import { hash } from "bcrypt";
import { generateToken } from "@/helpers/token";
import { compare } from "bcrypt";
import { OAuth2Client } from "google-auth-library";

import "dotenv/config";

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

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginGoogle = async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: "Missing idToken" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    let user = await User.findOne({ email });

    let token;

    if (!user) {
      user = new User({
        email,
        fullName: name,
        avatar: picture,
      });

      await user.save();
    }
    
    token = generateToken({ id: user._id });

    res.status(200).json({
      code: 200,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
};

export const loginFacebook = async (req, res) => {
  const { accessToken } = req.body;

  console.log("accessToken", accessToken);
  
  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  try {
    // Xác thực access token với Facebook
    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${accessToken}`
    );
    
    if (!fbResponse.ok) {
      throw new Error(`Facebook API Error: ${fbResponse.statusText}`);
    }
    
    // Parse JSON response
    const fbData = await fbResponse.json();
    console.log("Data from Facebook", fbData);
    
    

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let user = await User.findOne({ email });
    let token;

    if (!user) {
      user = new User({
        fullName: name,
        email,
        avatar: picture.data.url,
      });
      await user.save();
    }

    token = generateToken({ id: user._id });

    console.log("Token", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to authenticate with Facebook" });
  }
};
