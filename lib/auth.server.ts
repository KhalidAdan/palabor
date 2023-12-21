// auth.server.ts
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from "./session.server";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
  },
  async ({ accessToken, refreshToken, profile }) => {
    // Here, you would find or create a user in your database
    // and then return the user object
  }
);

const authenticator = new Authenticator(sessionStorage);
authenticator.use(googleStrategy, "google");

export { authenticator };
