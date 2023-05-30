import moment from "moment";
import jwt from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

export default class Token {
    static generate(user_id, ttl = 86400, nonce = null) {
        const iat = moment().unix();
        const payload = {
            sub: user_id,
            iss: process.env.NEXT_PUBLIC_BASEPATH,
            ttl: ttl,
            iat: iat,
            exp: iat + ttl,
            nonce: nonce
        };

        return jwt.encode(payload, process.env.JWT_SECRET);
    }
}
