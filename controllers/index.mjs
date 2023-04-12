export default class IndexController {

    static async testGet(req, res, next) {
        res.json({ msg: 'Get request to /api/test' });
    }

}