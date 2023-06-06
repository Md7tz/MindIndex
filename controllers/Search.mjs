import { HTTP } from "../config/constants.mjs";
import Validator from "validatorjs";
import Collection from "../models/Collection.mjs";

export default class SearchController {
  /**
   * @openapi
   * /api/search/{query}:
   *   get:
   *     summary: Search collections
   *     description: Search collections by name and description
   *     parameters:
   *       - in: path
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
  static async searchCollections(req, res, next) {
      const { query } = req.params;
      console.log(`query: ${query}`);

    // Validate the search query
    const validation = new Validator({ query }, {
      query: "required|string|max:255",
    });

    if (validation.fails()) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Validation errors.",
        errors: validation.errors.all(),
      });
    }

    try {
      const searchResults = await Collection.search(query);
      res.status(HTTP.OK).json(searchResults);
    } catch (error) {
      console.error('Error searching collections:', error);
      res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while searching collections' });
    }
  }
}
