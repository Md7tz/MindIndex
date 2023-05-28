import Validator from "validatorjs";
import { HTTP } from "../config/constants.mjs";
import { transaction } from "objection";
import User from "../models/User.mjs";
import Profile from "../models/Profile.mjs";

export default class Auth {

  static async renderRegister(req, res, next) {
    try {
      res.oidc.login({
        returnTo: "/",
        authorizationParams: {
          screen_hint: 'signup',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      // const validation = new Validator(req.body, {
      //   user: "required",
      // });

      // if (validation.fails()) {
      //   return res.status(HTTP.BAD_REQUEST).json({
      //     message: "Validation failed.",
      //     errors: validation.errors.all(),
      //   });
      // }

      const { user: { email, username, user_metadata } } = req.body;

      // check if user exist or not
      const exists = await User.query().where("email", email).orWhere("username", username).first();
      if(exists) return;

      console.log(req.body);
      await transaction(User.knex(), async (trx) => {
        const user = await User.query(trx).insert({
          username,
          email
        });

        const profile = await Profile.query(trx).insert({
          fullname: user_metadata.fullname || "",
          // You can add other profile properties here based on your requirements
        });

        await profile.$relatedQuery("user", trx).relate(user.id);

        req.user = user;
        req.user.profile = profile;
        // return res.status(HTTP.CREATED).json({
        //   message: "User created.",
        //   user,
        //   profile,
        // });
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async renderLogin(req, res, next) {
    try {
      res.oidc.login({
        authorizationParams: {
          screen_hint: 'login',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async redirectLogout(req, res, next) {
    try {
      res.oidc.logout({
        returnTo: "/",
      });
    } catch (error) {
      next(error);
    }
  }

  static async callback(req, res, next) {
    try {
      console.log(req.oidc);
      next();
      const callbackURI = process.env.AUTH0_CALLBACK_URI || "http://localhost:3000/callback";
      return res.redirect(callbackURI);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      res.oidc.refreshTokens().then((result) => {
        res.json(JSON.stringify(result));
      });
    } catch (error) {
      next(error);
    }
  }

  static async userinfo(req, res, next) {
    try {
      res.send(JSON.stringify(req.oidc.user));
    } catch (error) {
      next(error);
    }
  }

  static async token(req, res, next) {
    try {
      res.send(JSON.stringify(req.oidc.accessToken));
    } catch (error) {
      next(error);
    }
  }

  static async profile(req, res, next) {
    try {
      res.json(await req.oidc.fetchUserInfo())
    } catch (error) {
      next(error);
    }
  }

}