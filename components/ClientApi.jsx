import { Navigate } from "./Basepath";
import Event from "./Event";
import Storage from "./Storage";
import jwt_decode from "jwt-decode";
import moment from "moment";

class ClientApi {
    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_BASEPATH;
        this.prefix = "mindindex";
        this.token = null;
        this.user = null;

        this.getToken().then(token => {
            this.token = token;
        });

        this.getUser().then(user => {
            this.user = user;
        });

        this.setToken = this.setToken.bind(this);
        this.setUser = this.setUser.bind(this);
        this.storeToken = this.storeToken.bind(this);
        this.storeUser = this.storeUser.bind(this);
        this.getToken = this.getToken.bind(this);
        this.getUser = this.getUser.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.logout = this.logout.bind(this);
    }

    setToken(token) {
        this.token = token;
    }

    setUser(user) {
        this.user = user;
    }

    async storeToken(token) {
        this.setToken(token);
        await Storage.set(`${this.prefix}@token`, this.token);
    }

    async storeUser(user) {
        this.setUser(user);
        await Storage.set(`${this.prefix}@user`, JSON.stringify(this.user));
    }

    async getToken() {
        this.token = await Storage.get(`${this.prefix}@token`);
        return this.token;
    }

    async getUser() {
        this.user = JSON.parse(await Storage.get(`${this.prefix}@user`));
        return this.user;
    }

    // Modify the checkToken function to incorporate the suggested approach
    async checkToken() {
        this.getToken().then(async () => {
            if (!this.token) {
                throw new Error("Token not found");
            }

            const decoded = jwt_decode(this.token);

            // token expiration check
            if (moment().isAfter(moment(decoded.exp * 1000))) {
                throw new Error("Token expired");
            }

            // token refresh check
            if (moment().isAfter(moment(decoded.exp * 1000 - 43200))) {
                const response = await fetch(this.baseUrl + "/auth/refresh", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.token}`, // Include the token in the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    this.token = data.token;
                    await this.storeToken();
                } else {
                    throw new Error("Token refresh failed");
                }
            }

            Event.emit("token:valid");

            return true;
        }).catch((error) => {
            console.error("Error:", error);
            Event.emit("token:expired");
        });
    }

    async logout() {
        await Storage.remove(`${this.prefix}@token`);
        await Storage.remove(`${this.prefix}@user`);
        this.token = null;
        this.user = null;

        Navigate.push("/");
    }
}

export default new ClientApi();
