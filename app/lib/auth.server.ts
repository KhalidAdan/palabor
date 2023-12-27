// auth.server.ts
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from "./session.server";
import { prisma } from "./db";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
  },
  async ({ accessToken, refreshToken, profile, extraParams }) => {
    // find or create the user in your database

    let user = await prisma.user.findUnique({
      where: { email: profile.emails[0].value },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.emails[0].value,
          name: profile.displayName,
          image: profile.photos[0].value,
        },
      });
    }
  }
);

const authenticator = new Authenticator(sessionStorage);
authenticator.use(googleStrategy, "google");

export { authenticator };
