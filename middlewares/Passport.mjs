import passport from "passport";
import BearerStrategy from "passport-http-bearer";
import jwt from "jwt-simple";
import moment from "moment";
import User from "../models/User.mjs";

export default class Passport {

    static initialize() {
        passport.use(new BearerStrategy(async (token, done) => {
            try {
                const decoded = jwt.decode(token, process.env.JWT_SECRET);
                if (moment().isAfter(moment(decoded.exp * 1000))) {
                    return done(null, false)
                }
                // get the user with the subscription and collections select count and notes select count
                const user = await User
                    .query()
                    .findById(decoded.sub)
                    .withGraphFetched("[subscription,collections(selectId).[flashcards],notes(selectId)]");

                console.log(user);
                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (error) {
                return done(null, false);
            }
        }));
    }

    static bearerAuthenticate() {
        return passport.authenticate("bearer", { session: false });
    }
}
