import knex from "knex";
import config from "../knexfile.js";

const db = knex(config.development);

export default class NotesController {
  /**
   * @openapi
   * /api/notes:
   *   get:
   *     summary: Get all notes
   *     description: Retrieve a list of all notes.
   *     responses:
   *       200:
   *         description: Returns a JSON array of notes
   *       500:
   *         description: Internal server error
   */
  static async getAll(req, res, next) {
    try {
      // Get all notes from the database
      const notes = await db("notes").select("*");

      // Return the notes as JSON
      res.json(notes);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }

  /**
   * @openapi
   * /api/notes/{id}:
   *   get:
   *     summary: Get a note by ID
   *     description: Retrieve a note by its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the note to retrieve
   *     responses:
   *       200:
   *         description: Returns a JSON object representing the note
   *       404:
   *         description: Note not found
   *       500:
   *         description: Internal server error
   */
  static async getById(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const noteId = Number(req.params.id);

      // Try to find the note with the specified ID in the database
      const note = await db("notes").where({ id: noteId }).first();

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
   * @openapi
   * /api/notes/{id}:
   *   delete:
   *     summary: Delete a note by ID
   *     description: Delete a note with the specified ID from the database.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the note to delete
   *     responses:
   *       204:
   *         description: Note deleted successfully
   *       404:
   *         description: Note not found
   *       500:
   *         description: Internal server error
   */
  static async delete(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const noteId = Number(req.params.id);

      // Try to find the note with the specified ID in the database
      const note = await db("notes").where({ id: noteId }).first();

      // If no note was found, return a 404 response
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      // Delete the note from the database
      await db("notes").where({ id: noteId }).del();

      // Return a 204 response to indicate success
      res.sendStatus(204);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const noteId = Number(req.params.id);

      // Try to find the note with the specified ID in the database
      const note = await db("notes").where({ id: noteId }).first();

      // If no note was found, return a 404 response
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      // Update the note with the new data
      const updatedNote = await db("notes")
        .where({ id: noteId })
        .update(req.body)
        .returning("*");

      // Return the updated note as JSON
      res.json(updatedNote);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
  /**
   * @openapi
   * /api/notes:
   *   post:
   *     summary: Create a new note
   *     description: Create a new note with the specified title and body.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: The title of the note
   *               body:
   *                 type: string
   *                 description: The content of the note
   *             required:
   *               - title
   *               - body
   *     responses:
   *       201:
   *         description: Returns a JSON object representing the newly created note
   *       400:
   *         description: Invalid request body
   *       500:
   *         description: Internal server error
   */

  static async create(req, res, next) {
    try {
      // Extract the note data from the request body
      const { title, body } = req.body;
  
      // Insert the new note into the database
      const [{ id: noteId }] = await db("notes").insert({ title, body }, ['id']);
  
      // Retrieve the new note from the database
      const newNote = await db("notes").where({ id: noteId }).first();

  
      // Return the new note as JSON
      res.status(201).json(newNote);

    } catch (error) {
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
}
