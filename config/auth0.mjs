import dotenv from 'dotenv';
dotenv.config();

const config = {
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.APP_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  secret: process.env.SECRET,
  authRequired: process.env.AUTH0_REQUIRED || false,
  auth0Logout: process.env.AUTH0_LOGOUT || true,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationParams: {
    response_type: "code",
    audience: process.env.AUTH0_AUDIENCE,
  },
};

export default config;