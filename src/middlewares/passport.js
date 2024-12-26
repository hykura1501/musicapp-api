import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import User from "@/models/user.model";
export default (app) => {
  app.use(passport.initialize());
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        };
        console.log(user);
        done(null, profile);
      }
    )
  );
};
