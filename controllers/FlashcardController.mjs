import knex from "knex";
import config from "../knexfile.js";

const db = knex(config.development);

export default class FlashcardController {
  /**
   * @function getAll
   * @async
   * @memberof FlashcardController
   * @description Retrieves all collection's flashcards using the collection_id.
   *
   * @returns {Promise<Array<Model.Flashcard>>} The list of all flashcards.
   */
  static async getAll(req, res, next) {
    try {
      // Get all flashcards from the database
      const flashcards = await db("flashcards").where({
        collection_id: req.params.collectionId,
      });

      // Return the flashcards as JSON
      res.json(flashcards);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @function deleteAll
   * @async
   * @memberof FlashcardController
   * @description Deletes all flashcards associated with a given collection_id.
   *
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @param {Function} next - The next middleware function in the Express chain.
   * @returns {Promise<void>} Nothing is returned.
   */
  static async deleteAll(req, res, next) {
    try {
      // Delete all flashcards associated with the collection_id
      await db("flashcards")
        .where({ collection_id: req.params.collectionId })
        .del();

      // Send a success response
      res.status(200).json({ message: "All flashcards deleted successfully." });
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
  
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

  /**
   * @function create
   * @memberof FlashcardController
   * @description Creates a new flashcard.
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} The newly created flashcard.
   * @throws {Error} If there was an error creating the flashcard.
   */
  static async create(req, res, next) {
    try {
      const { question, answer, collectionId } = req.body;

      const [{ id: flashcardId }] = await db("flashcards").insert(
        {
          question,
          answer,
          collection_id: collectionId,
        },
        ["id"]
      );
      const newFlashcard = await db("flashcards")
        .where({ id: flashcardId })
        .first();

      return res.status(201).json(newFlashcard);
    } catch (error) {
      return next(error);
    }
  }

}
