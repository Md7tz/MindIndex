import knex from "knex";
import config from "../knexfile.js";

const db = knex(config.development);

export default class FlashcardController {

  
  /**
   *@function delete
   *@async
   *@memberof FlashcardController
   *@description Deletes a flashcard by ID.
   *@param {Number} id - The ID of the flashcard to delete.
   *@returns {Promise<void>} A Promise that resolves when the flashcard is deleted.
   *@throws {Error} If the flashcard with the specified ID is not found.
   */
  static async delete(req, res, next) {
    try {
      // Get the flashcard ID from the URL parameters
      const flashcardId = Number(req.params.id);

      // Try to find the flashcard with the specified ID in the database
      const flashcard = await db("flashcards")
        .where({ id: flashcardId })
        .first();

      // If no flashcard was found, return a 404 response
      if (!flashcard) {
        return res.status(404).json({ error: "flashcard not found" });
      }

      // Delete the flashcard from the database
      await db("flashcards").where({ id: flashcardId }).del();

      // Return a 204 response to indicate success
      res.sendStatus(204);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @function update
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
  static async update(req, res, next) {
    try {
      // Get the flashcard ID from the URL parameters
      const flashcardId = Number(req.params.id);

      // Try to find the flashcard with the specified ID in the database
      const flashcard = await db("flashcards")
        .where({ id: flashcardId })
        .first();

      // If no flashcard was found, return a 404 response
      if (!flashcard) {
        return res.status(404).json({ error: "flashcard not found" });
      }

      // Update the flashcard with the new data
      const updatedFlashcard = await db("flashcards")
        .where({ id: flashcardId })
        .update(req.body)
        .returning("*");

      // Return the updated flashcard as JSON
      res.json(updatedFlashcard);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

}
