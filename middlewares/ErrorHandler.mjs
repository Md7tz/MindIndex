import { HTTP } from "../config/constants.mjs";

/**
 * @openapi
 * /error:
 *   post:
 *     summary: Handle errors and return an appropriate response.
 *     responses:
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export default function ErrorHandler(err, req, res, next) {
    console.error(err);
    // Handle the error and send an appropriate response to the client
    res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
}
