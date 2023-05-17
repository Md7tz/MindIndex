import User from "../models/User.mjs";
import Profile from "../models/Profile.mjs";

import Validator from "validatorjs";
import { transaction } from "objection";
import { HTTP } from "../config/constants.mjs";

export default class UserController {
  /**
   * @openapi
   * /api/users:
   *   get:
   *     summary: Get all users.
   *     responses:
   *       '200':
   *         description: Users retrieved successfully.
   */
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.query().whereNotDeleted();

      return res.status(HTTP.OK).json({
        message: "Users retrieved successfully.",
        users,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/users/{id}:
   *   get:
   *     summary: Get a user by its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the user to retrieve.
   *     responses:
   *       '200':
   *         description: User retrieved successfully.
   *       '404':
   *         description: No User is registered with this ID.
   */
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.query().findById(id).whereNotDeleted();

      if (!user) {
        return res.status(HTTP.NOT_FOUND).json({
          message: "No User is registered with this ID.",
        });
      }

      return res.status(HTTP.OK).json({
        message: "User retrieved successfully.",
        user,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/users:
   *   post:
   *     summary: Create a new user.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *               email:
   *                 type: string
   *               fullname:
   *                 type: string
   *             example:
   *               username: johndoe
   *               password: johndoe123
   *               email: johndoe@email.com
   *               fullname: John Doe
   *     responses:
   *       '201':
   *         description: User created successfully.
   *       '400':
   *         description: BAD REQUEST
   */
  static async createUser(req, res, next) {
    try {
      const validation = new Validator(req.body, {
        username: "required|string",
        password: "required|string",
        email: "required|email",
        fullname: "required|string",
      });

      if (validation.fails()) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Validation failed.",
          errors: validation.errors.all(),
        });
      }

      const { username, password, email, fullname } = req.body;

      await transaction(User.knex(), async (trx) => {
        const user = await User.query(trx).insertGraph({
          username,
          password,
          email,
          fullname,
        });

        return res.status(HTTP.CREATED).json({
          message: "User created.",
          user,
        });
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/users/{id}:
   *   put:
   *     summary: Update a user and its associated flashcards.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the user to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                type: string
   *               password:
   *                type: string
   *               email:
   *                type: string
   *               fullname:
   *                type: string   *
   *             example:
   *              username: updatedjohndoe
   *              password: updatedjohndoe123
   *              email: updatedjohn@email.com
   *              fullname: Updated John Doe
   *     responses:
   *       '200':
   *         description: User updated successfully.
   *       '400':
   *         description: Bad request.
   *       '404':
   *         description: No User is registered with this ID.
   */
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;

      const validation = new Validator(req.body, {
        username: "required|string",
        password: "required|string",
        email: "required|email",
        fullname: "required|string",
      });

      if (validation.fails()) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Validation failed.",
          errors: validation.errors.all(),
        });
      }

      const { username, password, email, fullname } = req.body;

      await transaction(User.knex(), async (trx) => {
        // Update the user
        let updatedUser = await User.query(trx).patchAndFetchById(id, {
          username,
          password,
          email,
          fullname,
        });

        if (!updatedUser) {
          return res.status(HTTP.NOT_FOUND).json({
            message: "No User is registered with this ID.",
          });
        }

        return res.status(HTTP.OK).json({
          message: "User updated successfully.",
          user: updatedUser,
        });
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/users/{id}:
   *   delete:
   *     summary: Delete a user.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the user to delete.
   *     responses:
   *       '204':
   *         description: User deleted successfully.
   *       '404':
   *         description: No User is registered with this ID.
   */
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      await transaction(User.knex(), async (trx) => {
        // Check if the user exists
        let user = await User.query(trx).findById(id);

        if (!user) {
          return res.status(HTTP.NOT_FOUND).json({
            message: "User not found.",
          });
        }

        // Check if the user is already deleted
        if (user.deleted_at !== null) {
          user = await User.query(trx).findById(id).undelete().returning("*");

          return res.status(HTTP.OK).json({
            message: "User undeleted successfully.",
            user,
          });
        } else {
          // Delete the user
          await User.query(trx).deleteById(id);
          return res.status(HTTP.NO_CONTENT).end();
        }
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
