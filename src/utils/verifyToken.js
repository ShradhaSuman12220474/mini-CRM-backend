import { JWT_SECRET } from "../config/serverConfig.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (token)=>{
    return jwt.verify(token,JWT_SECRET);
}