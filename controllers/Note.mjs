import Note from "../models/Note.mjs";
import Validator from "validatorjs";
import { HTTP } from "../config/constants.mjs";

export default class NoteController {
  /**
   * @openapi
   * /api/notes:
   *   post:
   *     summary: Create a new note.
   *     security:
 *         - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               body:
   *                 type: string
   *     responses:
   *       '201':
   *         description: Note created successfully.
   *       '400':
   *         description: Validation failed.
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

      // pass note to next middleware
      req.payload = { note: req.body }
      next();
      if (req.payload.restricted) {
        return res.status(HTTP.FORBIDDEN).json({ message: req.payload.message });
      }

      // Extract the note data from the request body
      const { title, body } = req.body;
      const user_id = req.user.id;
      await Note.transaction(async (trx) => {
        const newNote = await Note.query(trx).insert({ title, body, user_id });

        res.status(HTTP.CREATED).json({
          message: "Note created successfully",
          note: newNote,
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
   * /api/notes:
   *   get:
   *     summary: get search notes by query.
   *     parameters:
   *       - in: query
   *         name: query
   *         schema:
   *           type: string
   *         required: false
   *         description: The search query
   *     responses:
   *       '200':
   *         description: Notes retrieved successfully.
   */
  static async getNotes(req, res, next) {
    try {
      const query = req.query.query || "";
      const page = req.query.page || 1;
      const limit = req.query.limit || 9;

      // Search notes by query
      const notes = await Note.search(query, page, limit);
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
   * @openapi
   * /api/notes/{id}:
   *   get:
   *     summary: Get a note by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the note to retrieve.
   *     responses:
   *       '200':
   *         description: Note retrieved successfully.
   *       '404':
   *         description: Note not found.
   */
  static async getNoteById(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const { id } = req.params;

      // Fetch note bu id
      const note = await Note.query().findById(id).whereNotDeleted();

      // If no note was found, return a 404 response
      if (!note) {
        return res.status(HTTP.NOT_FOUND).json({ message: "Note not found" });
      }

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

  static async getNotesByUserId(req, res, next) {
    try {
      const { id } = req.params;
      const { page = 1, pagesize = 10 } = req.query;

      const notes = await Note.query()
        .where("user_id", id)
        .orderBy("created_at", "desc")
        .page(page - 1, pagesize);

      if (!notes) {
        notes = [];
        return res.status(HTTP.OK).json({
          message: "You have no notes. Start by creating one!",
          notes,
        });
      }

      return res.status(HTTP.OK).json({
        message: "User notes retrieved successfully.",
        notes,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/notes/{id}:
   *   put:
   *     summary: Update a note by ID.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the note to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               body:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Note updated successfully.
   *       '400':
   *         description: Validation failed.
   */
  static async updateNote(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const { id } = req.params;

      // Define the validation rules
      const validationRules = {
        title: "string|required",
        body: "string|required",
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

      req.payload = { note: req.body, noteId: id }

      await next();
      if (req.payload.restricted) {
        return res.status(HTTP.FORBIDDEN).json({ message: req.payload.message });
      }

      // Extract the note data from the request body
      const { title, body } = req.body;

      await Note.transaction(async (trx) => {
        // Update the note with the new data
        const updatedNote = await Note.query(trx).patchAndFetchById(id, {
          title,
          body,
        });

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
   * @openapi
   * /api/notes/{id}:
   *   delete:
   *     summary: Delete a note by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the note to delete.
   *     responses:
   *       '204':
   *         description: Note deleted successfully.
   *       '404':
   *         description: Note not found.
   */
  static async deleteNote(req, res, next) {
    try {
      // Get the note ID from the URL parameters
      const { id } = req.params;

      // Start a transaction
      await Note.transaction(async (trx) => {
        // Fetch note by id
        let note = await Note.query(trx).findById(id);

        // If no note was found, return a 404 response
        if (!note) {
          return res.status(HTTP.NOT_FOUND).json({ message: "Note not found" });
        }

        if (note.deleted_at !== null) {
          note = await Note.query(trx).findById(id).undelete().returning("*");
          return res.status(HTTP.OK).json({
            message: "Note undeleted successfully.",
            note,
          });
        } else {
          // Delete the note
          await Note.query(trx).deleteById(id);
          return res.status(HTTP.NO_CONTENT).end();
        }
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, pass it to the next middleware
      next(error);
    }
  }
}
