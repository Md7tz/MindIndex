import Profile from "../models/Profile.mjs";
import Validator from "validatorjs";
import { HTTP } from "../config/constants.mjs";

export default class ProfileController {
  /**
   * @openapi
   * /api/profile/{id}:
   *   put:
   *     summary: Update a profile.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the profile to update.
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
        const updatedProfile = await Profile.query(trx).patchAndFetchById(id, {
          bio,
          avatar_url,
          address,
          birth_date,
          gender,
          occupation,
          interests,
        });

        // If no profile was found, return a 404 response
        if (!updatedProfile) {
          return res
            .status(HTTP.NOT_FOUND)
            .json({ error: "Profile not found" });
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
