import Validator from "validatorjs";

// constants
import { HTTP } from "../config/constants.mjs";

// Model
import Flashcard from "../models/Flashcard.mjs";

export default class FlashcardController {
  /**
   *@function deleteFlashcard
   *@async
   *@memberof FlashcardController
   *@description Deletes a flashcard by ID.
   *@param {Number} id - The ID of the flashcard to delete.
   *@returns {Promise<void>} A Promise that resolves when the flashcard is deleted.
   *@throws {Error} If the flashcard with the specified ID is not found.
   */
  static async deleteFlashcard(req, res, next) {
    try {
      // Get the flashcard ID from the URL parameters
      const { id } = req.params;

      await Flashcard.transaction(async (trx) => {
        // Try to find the flashcard with the specified ID in the database
        const flashcard = await Flashcard.query(trx).findById(id);

        console.log(flashcard);
        // If no flashcard was found, return a 404 response
        if (!flashcard) {
          return res.status(HTTP.NOT_FOUND).json({
            message: "Flashcard not found.",
          });
        }
        // Delete the flashcard from the database
        await Flashcard.query(trx).deleteById(id);
        return res.status(HTTP.NO_CONTENT).end();
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @function updateFlashcard
   * @async
   * @memberof FlashcardController
   * @description Updates a flashcard by ID.
   *
   * @param {Number} id - The ID of the flashcard to update.
   * @param {Object} updateData - The data to update the flashcard with.
   *
   * @returns {Promise<Model.Flashcard>} The updated flashcard.
   *
   * @throws {Error} If the flashcard with the specified ID is not found.
   */
  static async updateFlashcard(req, res, next) {
    try {
      // Get the flashcard ID from the URL parameters
      const { id } = req.params;

      // Define validationRules
      const validationRules = {
        question: "required|string",
        answer: "required|string",
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

      await Flashcard.transaction(async (trx) => {
        // Extract the flashcard data from the request body
        const { question, answer } = req.body;

        // Update the flashcard with the new data
        const updatedFlashcard = await Flashcard.query(trx)
          .patchAndFetchById(id, { question, answer })
          .returning("*");

        // If no flashcard was found, return a 404 response
        if (!updatedFlashcard) {
          return res
            .status(HTTP.NOT_FOUND)
            .json({ error: "Flashcard not found" });
        }

        // Return the updated flashcard as JSON
        return res.status(HTTP.OK).json({
          message: "Flashcard updated successfully.",
          flashcard: updatedFlashcard,
        });
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
}
