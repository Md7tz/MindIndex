import Flashcard from "../models/Flashcard.mjs";
import Validator from "validatorjs";
import { HTTP } from "../config/constants.mjs";

export default class FlashcardController {

  /**
 * @openapi
 * /api/flashcards/{id}:
 *   delete:
 *     summary: Delete a flashcard.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the flashcard to delete.
 *     responses:
 *       '204':
 *         description: Flashcard deleted successfully.
 *       '404':
 *         description: Flashcard not found.
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
   * @openapi
   * /api/flashcards/{id}:
   *   put:
   *     summary: Update a flashcard.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the flashcard to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               question:
   *                 type: string
   *               answer:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Flashcard updated successfully.
   *       '400':
   *         description: Validation failed.
   *
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
