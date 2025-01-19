import mongoose from "mongoose";
const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    resetToken: String,
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

forgotPasswordSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgot-password"
);
export default ForgotPassword;
