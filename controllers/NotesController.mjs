import { Request, Response, NextFunction } from "express";

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
}
