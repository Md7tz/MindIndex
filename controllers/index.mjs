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
    static async testPost(req, res, next) {
        res.json({ msg: "Post request to /api/test" });
    }
    static async testPut(req, res, next) {
        res.json({ msg: "Put request to /api/test" });
    }
    static async testDelete(req, res, next) {
        res.json({ msg: "Delete request to /api/test" });
    }
    static async testPatch(req, res, next) {
        res.json({ msg: "Patch request to /api/test" });
    }
    

}