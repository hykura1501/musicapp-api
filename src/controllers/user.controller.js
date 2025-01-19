import User from "@/models/user.model";
import Song from "@/models/song.model";
import Artist from "@/models/artist.model";
import sendMail from "@/helpers/sendMail";
import ForgotPassword from "@/models/forgot-pass.model";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from "bcrypt";
// [GET] /user/me
export const getMe = async (req, res) => {
  try {
    req.user.password = undefined;
    const favoriteSongIds = req.user.favoriteSongs.map((song) => song.songId);
    const favoriteArtistIds = req.user.favoriteArtists.map(
      (artist) => artist.artistId
    );
    const favoriteSongs = [];
    for (let id of favoriteSongIds) {
      const song = await Song.findById(id).select("-userId");
      if (song) {
        favoriteSongs.push(song);
      }
    }
    const favoriteArtists = [];
    for (let id of favoriteArtistIds) {
      const artist = await Artist.findById(id);
      if (artist) {
        favoriteArtists.push(artist);
      }
    }
    return res.status(200).json({
      code: 200,
      data: {
        ...req.user._doc,
        favoriteSongs,
        favoriteArtists,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [GET] /user/profile/:userId
export const detailUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select(
      "-password -songUploaded -favoriteSong"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ code: 200, data: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [PATCH] /user/update
export const updateMe = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id;

    console.log("body:::::::", body);

    console.log("req.user:::::::", req.user);

    if (body.email && body.email !== req.user.email) {
      const emailExist = await User.findOne({ email: body.email });
      if (emailExist) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    if (body.password) {
      delete body.password; // Prevent user from updating password
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, body, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ code: 200, data: user });
  } catch (error) {
    console.log("error:::::::", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [POST] /user/password/forgot
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const forgotPass = new ForgotPassword({ email, otp, expiresAt });
    await forgotPass.save();
    const subject = "OTP Code for Password Recovery";
    const html = `Your OTP code to recover your password is: <b>${otp}</b>. Please do not share it with anyone. Note that this code is valid for only 5 minutes.`;
    sendMail(email, subject, html);
    console.log(otp);
    return res.status(200).json({ code: 200, message: "Email sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [POST] /user/password/otp
export const otp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const forgotPass = await ForgotPassword.findOne({
      email,
      otp
    });
    if (!forgotPass) {
      console.log("OTP is incorrect");
      return res.status(400).json({ message: "OTP is incorrect" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = uuidv4();
    forgotPass.resetToken = resetToken;
    await forgotPass.save();
    return res.status(200).json({ code: 200, resetToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [POST] /user/password/reset
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    
    const forgotPass = await ForgotPassword.findOne({ resetToken });
    if (!forgotPass) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    const hashedPassword = await hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email: forgotPass.email },
      { password: hashedPassword }
    );

    return res
      .status(200)
      .json({ code: 200, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPremium = async (req, res) => {
  try {
    const { day } = req.body;
    const userId = req.user.id;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        isPremium: true,
        premiumExpireAt: new Date(Date.now() + day * 24 * 60 * 60 * 1000),
      }
    ).select("-password");
    return res.status(200).json({ code: 200, message: "Upgrade successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ code: 400, message: "Passwords do not match" });
    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    const isMatch = await compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ code: 400, message: "Old password is incorrect" });
    }
    const hashedPassword = await hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ code: 200, message: "Password changed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};
