export default class Auth {

    static async register(req, res, next) {
        try {
            res.oidc.login({
                returnTo: "/",
                authorizationParams: {
                  screen_hint: 'signup',
                },
              });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            res.oidc.login({
                authorizationParams: {
                  screen_hint: 'login',
                },
              });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            res.oidc.logout({
                returnTo: "/",
            });
        } catch (error) {
            next(error);
        }
    }

    static async callback(req, res, next) {
        try {
            res.oidc.authenticated({
                returnTo: "/",
            });
        } catch (error) {
            next(error);
        }
    }

    static async refresh(req, res, next) {
        try {
            res.oidc.refreshTokens().then((result) => {
                res.json(JSON.stringify(result));
            });
        } catch (error) {
            next(error);
        }
    }

    static async userinfo(req, res, next) {
        try {
            res.send(JSON.stringify(req.oidc.user));
        } catch (error) {
            next(error);
        }
    }

    static async token(req, res, next) {
        try {
            res.send(JSON.stringify(req.oidc.accessToken));
        } catch (error) {
            next(error);
        }
    }

    static async profile(req, res, next) {
        try {
            res.json(await req.oidc.fetchUserInfo())
        } catch (error) {
            next(error);
        }
    }

}