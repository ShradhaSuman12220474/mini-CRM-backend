import dotenv from "dotenv"

dotenv.config();

export const DB_URL =process.env.DB_URL;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_TIMEOUT = process.env.JWT_TIMEOUT;
