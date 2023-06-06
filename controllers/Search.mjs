import { HTTP } from "../config/constants.mjs";
import Validator from "validatorjs";
import Collection from "../models/Collection.mjs";
import Note from "../models/Note.mjs";
import Fuse from "fuse.js";

export default class SearchController {
  /**
   * @openapi
   * /api/search:
   *   get:
   *     summary: Search collections and notes
   *     description: Search collections and notes by name, description, title, and body
   *     parameters:
   *       - in: query
   *         name: query
   *         schema:
   *           type: string
   *         required: true
   *         description: The search query
   *     responses:
   *       200:
   *         description: Search results
   *       400:
   *         description: Validation errors
   *       500:
   *         description: An error occurred while searching
   */
  static async search(req, res, next) {
    const { query } = req.query;
    console.log(`query: ${query}`);

    // Validate the search query
    const validation = new Validator(
      { query },
      {
        query: "required|string|max:255",
      }
    );

    if (validation.fails()) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Validation errors.",
        errors: validation.errors.all(),
      });
    }

    try {
      const collections = await Collection.search(query);
      const notes = await Note.search(query);

      const options = {
        keys: ["name", "description", "title", "body"],
        includeScore: true,
        threshold: 0.4,
      };

      const fusedData = [...collections, ...notes];
      const dataFuse = new Fuse(fusedData, options);

      const fusedResults = dataFuse.search(query);

      res.status(HTTP.OK).json(fusedResults);
    } catch (error) {
      console.error("Error searching collections and notes:", error);
      res
        .status(HTTP.INTERNAL_SERVER_ERROR)
        .json({
          error: "An error occurred while searching collections and notes",
        });
    }
  }
}
