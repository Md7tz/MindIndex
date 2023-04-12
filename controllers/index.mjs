export default class IndexController {

    /**
     * @openapi
     * /api/test:
     *   get:
     *     description: test endpoint for GET requests
     *     responses:
     *       200:
     *         description: Returns a json object with a message
     */
    static async testGet(req, res, next) {
        res.json({ msg: 'Get request to /api/test' });
    }

}