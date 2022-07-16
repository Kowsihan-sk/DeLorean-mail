import dotenv from "dotenv"
dotenv.config();
import { google } from "googleapis";

const connectGmail = async () => {
    try {
        global.oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

        const token = {
            "access_token": process.env.ACCESS_TOKEN,
            "refresh_token": process.env.REFRESH_TOKEN,
            "scope": process.env.TOKEN_SCOPE,
            "token_type": process.env.TOKEN_TYPE,
            "expiry_date": process.env.TOKEN_EXPIRY_DATE
        };

        await oAuth2Client.setCredentials(token);

        console.log("Gmail connection SUCCESS");
    } catch (error) {
        console.log("Gmail connection FAIL");
        process.exit(1);
    }
}

export default connectGmail;