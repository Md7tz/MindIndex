import Validator from "validatorjs";
import { HTTP } from "../config/constants.mjs";
import { transaction } from "objection";
import User from "../models/User.mjs";
import Profile from "../models/Profile.mjs";
import Token from "../config/token.mjs";

export default class Auth {

  /**
   * @openapi
   * /register:
   *   post:
   *     summary: Register a new user
   *     description: Create a new user account
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 maxLength: 255
   *               password:
   *                 type: string
   *                 maxLength: 255
   *               email:
   *                 type: string
   *                 maxLength: 255
   *               fullname:
   *                 type: string
   *                 maxLength: 255
   *             required:
   *               - username
   *               - password
   *               - email
   *               - fullname
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *         description: Validation errors
   *       409:
   *         description: Username or email already in use
   */
  static async register(req, res, next) {
    console.log(req.body);
    const validation = new Validator(
      req.body,
      {
        username: "required|string|max:255",
        password: "required|confirmed|string|max:255",
        email: "required|string|max:255",
        fullname: "required|string|max:255",
      }
    );

    if (validation.fails()) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Validation errors.",
        errors: validation.errors.all(),
      });
    }

    const { username, password, email, fullname } = req.body;

    try {
      // Check if username or email already exist
      const existingUser = await User.query().where({ username }).orWhere({ email }).first();
      if (existingUser) {
        return res.status(HTTP.CONFLICT).json({
          message: "Username or email already in use.",
        });
      }

      const user = await transaction(User.knex(), async (trx) => {
        const newUser = await User.query(trx).insert({
          username,
          password: await User.hashPassword(password),
          email,
          fullname,
        });

        await Profile.query(trx).insert({
          user_id: newUser.id,
        });

        return newUser;
      });

      return res.status(HTTP.CREATED).json({
        message: "User created successfully.",
        user,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @openapi
   * /login:
   *   post:
   *     summary: User login
   *     description: Log in with username and password
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 maxLength: 255
   *               password:
   *                 type: string
   *                 maxLength: 255
   *             required:
   *               - username
   *               - password
   *     responses:
   *       200:
   *         description: User logged in successfully
   *       400:
   *         description: Validation errors
   *       401:
   *         description: Invalid credentials
   *       404:
   *         description: User not found
   */
  static async login(req, res, next) {

    const validation = new Validator(
      req.body,
      {
        username: "required|string|max:255",
        password: "required|string|max:255",
      },
      {
        'username.required': 'Please provide a valid Username or Email Address'
      }
    );

    if (validation.fails()) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Validation errors.",
        errors: validation.errors.all(),
      });
    }

    const { username, password } = req.body;

    try {
      const user = await User.query()
        .where((builder) => {
          builder
            .where({ username })
            .orWhere('email', username)
        })
        .first()
        .whereNotDeleted();

      if (!user) {
        return res.status(HTTP.NOT_FOUND).json({
          message: "User not found.",
        });
      }

      if (!await user.verifyPassword(password)) {
        return res.status(HTTP.UNAUTHORIZED).json({
          message: "Invalid credentials.",
        });
      }
      const token = Token.generate(user.id);

      return res.status(HTTP.OK).json({
        message: "User logged in successfuly.",
        user,
        token
      });
    } catch (error) {
      return next(error);
    }
  }
}