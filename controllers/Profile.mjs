import Profile from "../models/Profile.mjs";
import Validator from "validatorjs";
import { HTTP } from "../config/constants.mjs";

export default class ProfileController {
  /**
   * @openapi
   * /api/users/{id}/profiles:
   *   get:
   *     summary: Get the profile of a user by his ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to retrieve his profile.
   *     responses:
   *       '200':
   *         description: Profile retrieved successfully.
   *       '404':
   *         description: No user is registered with this ID.
   */
  static async getProfileByUserId(req, res, next) {
    try {
      // Get the user ID from the URL parameters
      const { id } = req.params;

      // Fetch the profile by user id
      const profile = await Profile.query().where("user_id", id).first();

      // If no profile was found, means no user is registered with that ID, return a 404 response
      if (!profile) {
        return res
          .status(HTTP.NOT_FOUND)
          .json({ message: "No User is registered with this ID." });
      }

      return res.status(HTTP.OK).json({
        message: "Profile retrieved successfully.",
        profile,
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @openapi
   * /api/users/{id}/profiles:
   *   post:
   *     summary: Create an empty profile for the user. Will be used if no profile is found for a user.
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *            type: string
   *          description: The ID of the user to create a profile for.
   *     responses:
   *       '201':
   *         description: Profile created successfully.
   *       '400':
   *         description: Validation failed.
   */
  static async createProfile(req, res, next) {
    try {
      // Get the user ID from the URL parameters
      const { id } = req.params;

      await Profile.transaction(async (trx) => {
        const newProfile = await Profile.query(trx).insert({ user_id: id });

        res.status(HTTP.CREATED).json({
          message: "Profile created successfully",
          profile: newProfile,
        });
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @openapi
   * /api/users/{id}/profiles:
   *   put:
   *     summary: Update a profile.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the user owning the profile to be updated.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               bio:
   *                 type: string
   *               avatar_url:
   *                 type: string
   *               address:
   *                 type: string
   *               birth_date:
   *                 type: string
   *               gender:
   *                 type: string
   *               occupation:
   *                 type: string
   *               interests:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Profile updated successfully.
   *       '400':
   *         description: Validation failed.
   *
   */
  static async updateProfile(req, res, next) {
    try {
      // Get the profile ID from the URL parameters
      const { id } = req.params;

      // Define validationRules
      const validationRules = {
        bio: "required|string",
        avatar_url: "required|string",
        address: "required|string",
        birth_date: "required|date",
        gender: "required|string|in:F,M",
        occupation: "required|string",
        interests: "required|string",
      };

      // Create a new validator instance with the data and validation rules
      const validation = new Validator(req.body, validationRules);

      // Check if the validation fails
      if (validation.fails()) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Validation failed.",
          errors: validation.errors.all(),
        });
      }

      await Profile.transaction(async (trx) => {
        // Extract the profile information from the request body
        const {
          bio,
          avatar_url,
          address,
          birth_date,
          gender,
          occupation,
          interests,
        } = req.body;

        // Update the profile with the new data
        const updatedProfile = await Profile.query(trx)
          .where("user_id", id)
          .patch({
            bio,
            avatar_url,
            address,
            birth_date,
            gender,
            occupation,
            interests,
          });

        // If no profile was found when prompted to update, return a 404 response.
        if (!updatedProfile) {
          return res.status(HTTP.NOT_FOUND).json({
            message: "No profile found for this user.",
          });
        }

        // Return the updated profile as JSON
        return res.status(HTTP.OK).json({
          message: "Profile updated successfully.",
          profile: updatedProfile,
        });
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
}
