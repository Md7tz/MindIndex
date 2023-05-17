import Validator from "validatorjs";

// Model
import Note from "../models/Note.mjs";

// constants
import { HTTP } from "../config/constants.mjs";

export default class NoteController {
  /**
   * @function createNote
   * @memberof NoteController
   * @description Creates a new note.
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @throws {Error} If there was an error creating the note.
   */
  static async createNote(req, res, next) {
    try {
      // Define the validation rules
      const validationRules = {
        title: "required|string",
        body: "required|string",
      };

      // Create a new validator instance with the data and validationRules
      const validation = new Validator(req.body, validationRules);

      // Check if the validation fails
      if (validation.fails()) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Validation failed.",
          errors: validation.errors.all(),
        });
      }
      // Extract the note data from the request body
      const { title, body } = req.body;

      await Note.transaction(async (trx) => {
        // Create a new note using Objection.js
        const newNote = await Note.query(trx).insert({ title, body });
        // Return the new note as JSON
        res.status(HTTP.CREATED).json({ message: "Note created", newNote });
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @function getAllNotes
   * @async
   * @memberof NoteController
   * @description Retrieves all notes.
   *
   * @returns {Promise<Array<Model.Notes>>} The list of all notes.
   */
  static async getAllNotes(req, res, next) {
    try {
      // Get all notes from the database
      const notes = await Note.query();

      // Return the notes as JSON
      res
        .status(HTTP.OK)
        .json({ message: "Notes retrieved successfully.", notes });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @function getNoteById
   * @async
   * @memberof NoteController
   * @description Reterive a note by ID.
   *
   * @param {Number} id - The ID of the note to reterived.
   *
   * @returns {Promise<void>} A promise that resolves when the note has been reterived.
   *
   * @throws {Error} If the note with the specified ID is not found.
   */
  static async getNoteById(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const { id } = req.params;

      // Try to find the note with the specified ID in the database
      const note = await Note.query().findById(id);

      // If no note was found, return a 404 response
      if (!note) {
        return res.status(HTTP.NOT_FOUND).json({ message: "Note not found" });
      }

      // Return the note as JSON
      return res.status(HTTP.OK).json({
        message: "Note retrieved successfully.",
        note,
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
  /**
   * @function updateNote
   * @async
   * @memberof NoteController
   * @description Updates a note by ID.
   *
   * @param {Number} id - The ID of the note to update.
   * @param {Object} updateData - The data to update the note with.
   *
   * @returns {Promise<Model.note>} The updated note.
   *
   * @throws {Error} If the note with the specified ID is not found.
   */
  static async updateNote(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const { id } = req.params;

      // Define the validation rules using Validator.js
      const validationRules = {
        title: "string",
        body: "string",
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

      await Note.transaction(async (trx) => {
        // Extract the note data from the request body
        const { title, body } = req.body;
        // Update the note with the new data
        const updatedNote = await Note.query(trx)
          .patchAndFetchById(id, { title, body })
          .returning("*");

        // If no note was found, return a 404 response
        if (!updatedNote) {
          return res.status(HTTP.NOT_FOUND).json({
            message: "Note not found.",
          });
        }
        // Return the updated note as JSON
        return res.status(HTTP.OK).json({
          message: "Note updated successfully.",
          note: updatedNote,
        });
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   *@function deleteNote
   *@async
   *@memberof NoteController
   *@description Deletes a note by ID.
   *@param {Number} id - The ID of the note to delete.
   *@returns {Promise<void>} A Promise that resolves when the note is deleted.
   *@throws {Error} If the note with the specified ID is not found.
   */
  static async deleteNote(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const { id } = req.params;

      // Start a transaction
      await Note.transaction(async (trx) => {
        // Try to find the note with the specified ID in the database
        const note = await Note.query(trx).findById(id);
        console.log(note);
        // If no note was found, return a 404 response
        if (!note) {
          return res.status(HTTP.NOT_FOUND).json({ message: "Note not found" });
        }

        // Delete the note from the database
        await Note.query(trx).deleteById(id);

        return res.status(HTTP.NO_CONTENT).end();
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
}
