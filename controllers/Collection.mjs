import Collection from "../models/Collection.mjs";
import Flashcard from "../models/Flashcard.mjs";

import Validator from "validatorjs";
import { transaction } from "objection";
import { HTTP } from "../config/constants.mjs";
import slugify from "slugify";

export default class CollectionController {
  /**
   * @openapi
   * /api/collections:
   *   get:
   *     summary: Get search collections by query.
   *     responses:
   *       '200':
   *         description: Collections retrieved successfully.
   */
  static async getCollections(req, res, next) {
    try {
      const query = req.query.query || "";
      const page = req.query.page || 1;
      const limit = req.query.limit || 9;

      const collections = await Collection.search(query, page, limit);

      return res.status(HTTP.OK).json({
        message: "Collections retrieved successfully.",
        collections,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/users/{id}/collections/{id}:
   * 
   *   get:
   *     summary: Get a collection by its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the collection to retrieve.
   *     responses:
   *       '200':
   *         description: Collection retrieved successfully.
   *       '404':
   *         description: Collection not found.
   */
  static async getUserCollectionById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const collection = await Collection.query()
        .findById(id)
        .withGraphFetched("flashcards")
        .whereNotDeleted();

      // check if collection belongs to user
      if (!!collection && collection?.user_id != userId) {
        return res.status(HTTP.FORBIDDEN).json({
          message: "You are not authorized to edit this collection.",
        });
      }

      if (!collection) {
        return res.status(HTTP.NOT_FOUND).json({
          message: "Collection not found.",
        });
      }

      return res.status(HTTP.OK).json({
        message: "Collection retrieved successfully.",
        collection,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getCollectionsByUserId(req, res, next) {
    try {
      const { id } = req.params;
      const { page, pagesize } = req.query;

      const collections = await Collection.query()
        .where("user_id", id)
        .orderBy("created_at", "desc")
        .page(page - 1, pagesize)
        .whereNotDeleted()
        ;
      if (!collections) {
        collections = [];
        return res.status(HTTP.OK).json({
          message: "You have no collections. Start by creating one!",
          collections,
        });
      }

      return res.status(HTTP.OK).json({
        message: "User Collections retrieved successfully.",
        collections,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
 * @openapi
 * /api/collections/{slug}:
 *   get:
 *     summary: Retrieve a collection by slug
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a collection by its slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: The slug of the collection.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Collection retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       '404':
 *         description: Collection not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
  static async getCollectionBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const collection = await Collection.query()
        .where("slug", slug)
        .withGraphFetched("[user.[profile(selectAvatar)], flashcards, notes]")
        .whereNotDeleted()
        .first();

      if (!collection) {
        return res.status(HTTP.NOT_FOUND).json({
          message: "Collection not found.",
        });
      }

      return res.status(HTTP.OK).json({
        message: "Collection retrieved successfully.",
        collection,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/collections:
   *   post:
   *     summary: Create a new collection.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               flashcards:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     question:
   *                       type: string
   *                     answer:
   *                       type: string
   *             example:
   *               name: My Collection
   *               description: A collection of flashcards.
   *               flashcards:
   *                 - question: What is the capital of France?
   *                   answer: Paris
   *     responses:
   *       '201':
   *         description: Collection created successfully.
   *       '400':
   *         description: BAD REQUEST
   */
  static async createCollection(req, res, next) {
    try {
      const validation = new Validator(req.body, {
        name: "required|string",
        slug: "required|string",
        description: "required|string",
        flashcards: "required|array",
        "flashcards.*.question": "required|string",
        "flashcards.*.answer": "required|string",
      });

      if (validation.fails()) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Validation failed.",
          errors: validation.errors.all(),
        });
      }

      const { name, description, flashcards } = req.body;
      // check if collection name or slug already exists
      const existing = await Collection
        .query()
        .where({ name, })
        .orWhere({ slug: slugify(name, { lower: true }) })
        .first();

      if (existing) {
        return res.status(HTTP.CONFLICT).json({
          message: "Collection name already exists.",
        });
      }

      const user_id = req.user.id;
      await transaction(Collection.knex(), async (trx) => {
        const collection = await Collection.query(trx).insertGraph({
          name,
          slug: slugify(name, { lower: true }),
          description,
          flashcards,
          user_id,
        });

        return res.status(HTTP.CREATED).json({
          message: "Collection created.",
          collection,
        });
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/collections/{id}:
   *   put:
   *     summary: Update a collection and its associated flashcards.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the collection to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               flashcards:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     question:
   *                       type: string
   *                     answer:
   *                       type: string
   *             example:
   *               name: Updated Collection
   *               description: Updated collection description.
   *               flashcards:
   *                 - id: 1
   *                   question: Updated question
   *                   answer: Updated answer
   *                 - question: New question
   *                   answer: New answer
   *     responses:
   *       '200':
   *         description: Collection and associated flashcards updated successfully.
   *       '400':
   *         description: Bad request.
   *       '404':
   *         description: Collection not found.
   */
  static async updateCollection(req, res, next) {
    try {
      const { id } = req.params;

      const validation = new Validator(req.body, {
        name: "required|string",
        description: "required|string",
        flashcards: "required|array",
        "flashcards.*.question": "required|string",
        "flashcards.*.answer": "required|string",
      });

      if (validation.fails()) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Validation failed.",
          errors: validation.errors.all(),
        });
      }

      const { name, description, flashcards } = req.body;

      await transaction(Collection.knex(), async (trx) => {
        // Update the collection
        let updatedCollection = await Collection.query(trx)
          .patchAndFetchById(id, { name, description });

        if (!updatedCollection) {
          return res.status(HTTP.NOT_FOUND).json({
            message: "Collection not found.",
          });
        }

        // Remove any flashcards that were previously associated with the collection
        await updatedCollection.$relatedQuery("flashcards", trx).unrelate();
        // Delete flashcards that have no relation to any collection
        await Flashcard.query(trx).whereNull("collection_id").delete();

        // Create new associated flashcards
        await updatedCollection
          .$relatedQuery("flashcards", trx)
          .insertAndFetch(flashcards);

        // Fetch the updated collection with the flashcards
        updatedCollection = await Collection.query(trx)
          .findById(updatedCollection.id)
          .withGraphFetched("flashcards");

        return res.status(HTTP.OK).json({
          message: "Collection updated successfully.",
          collection: updatedCollection,
        });
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @openapi
   * /api/collections/{id}:
   *   delete:
   *     summary: Delete a collection and its associated flashcards.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The ID of the collection to delete.
   *     responses:
   *       '204':
   *         description: Collection deleted successfully.
   *       '404':
   *         description: Collection not found.
   */
  static async deleteCollection(req, res, next) {
    try {
      const { id } = req.params;

      await transaction(Collection.knex(), async (trx) => {
        // Check if the collection exists
        let collection = await Collection.query(trx).findById(id);

        if (!collection) {
          return res.status(HTTP.NOT_FOUND).json({
            message: "Collection not found.",
          });
        }

        if (collection.deleted_at != null) {
          collection = await collection.$query(trx).undelete().returning("*");
          collection.flashcards = await collection
            .$relatedQuery("flashcards", trx)
            .undelete()
            .returning("*");

          return res.status(HTTP.OK).json({
            message: "Collection undeleted successfully.",
            collection,
          });
        } else {
          // Delete the collection and its associated flashcards
          await collection.$relatedQuery("flashcards", trx).delete();
          await collection.$query(trx).delete();

          return res.status(HTTP.NO_CONTENT).end();
        }
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
