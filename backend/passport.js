import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";

const GOOGLE_CLIENT_ID =
  "890072536632-k4q3nuod7mic21t9npvjhcrj2cufi34m.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "c96856c55a46d9b4e995";
const GITHUB_CLIENT_SECRET = "440b18d01d242f00808d18fbd4d255dff936211c";

const FACEBOOK_APP_ID = "879168333799394";
const FACEBOOK_APP_SECRET = "8fc891197a550cd1f1fa4380489737d6";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
