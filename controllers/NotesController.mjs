import Note from "../models/Note.mjs";

export default class NotesController {
  /**
   * @function getAll
   * @async
   * @memberof NotesController
   * @description Retrieves all notes.
   *
   * @returns {Promise<Array<Model.Notes>>} The list of all notes.
   */
  static async getAll(req, res, next) {
    try {
      // Get all notes from the database
      const notes = await Note.query();

      // Return the notes as JSON
      res.json(notes);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @function getById
   * @async
   * @memberof NotesController
   * @description Reterive a note by ID.
   *
   * @param {Number} id - The ID of the note to reterived.
   *
   * @returns {Promise<void>} A promise that resolves when the note has been reterived.
   *
   * @throws {Error} If the note with the specified ID is not found.
   */
  static async getById(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const noteId = Number(req.params.id);

      // Try to find the note with the specified ID in the database
      const note = await Note.query().findById(noteId);

      // If no note was found, return a 404 response
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      // Return the note as JSON
      res.json(note);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
  /**
   *@function delete
   *@async
   *@memberof NotesController
   *@description Deletes a note by ID.
   *@param {Number} id - The ID of the note to delete.
   *@returns {Promise<void>} A Promise that resolves when the note is deleted.
   *@throws {Error} If the note with the specified ID is not found.
   */
  static async delete(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const noteId = Number(req.params.id);

      // Try to find the note with the specified ID in the database
      const note = await Note.query().findById(noteId);

      // If no note was found, return a 404 response
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      // Delete the note from the database
      await Note.query().deleteById(noteId);
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
   * @memberof NotesController
   * @description Updates a note by ID.
   *
   * @param {Number} id - The ID of the note to update.
   * @param {Object} updateData - The data to update the note with.
   *
   * @returns {Promise<Model.note>} The updated note.
   *
   * @throws {Error} If the note with the specified ID is not found.
   */
  static async update(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const noteId = Number(req.params.id);

      // Update the note with the new data
      const updatedNote = await Note.query()
        .patchAndFetchById(noteId, req.body)
        .returning("*");

      // Return the updated note as JSON
      res.json(updatedNote);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @function create
   * @memberof NotesController
   * @description Creates a new note.
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @throws {Error} If there was an error creating the note.
   */
  static async create(req, res, next) {
    try {
      
      // Extract the note data from the request body
      const { title, body } = req.body;

      // Create a new note using Objection.js
      const newNote = await Note.query().insert({ title, body });

      // Return the new note as JSON
      res.status(201).json(newNote);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
}
