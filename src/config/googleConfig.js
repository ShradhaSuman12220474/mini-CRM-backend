import { google } from "googleapis";
import { CLIENT_ID, CLIENT_SECRET } from "./serverConfig.js";

export const oatuh2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'postmessage',

);
