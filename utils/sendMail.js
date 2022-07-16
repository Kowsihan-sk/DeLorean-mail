import dotenv from "dotenv"
dotenv.config();
import { google } from "googleapis";

const makeBody = (user, sub, body, date) => {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", user, "\n",
        "from: ", process.env.USER_ID, "\n",
        "subject: ", sub, "\n\n",
        body + "\n\n\n DeLorean Mail From Date(dd-mm-yyyy): " + date
    ].join('');

    var encodedMail = Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}

export const send_mail = async (user, sub, body, date) => {
    try {
        var raw = makeBody(user, sub, body, date);

        const gmail = google.gmail({ version: 'v1', oAuth2Client });
        await gmail.users.messages.send({
            auth: oAuth2Client,
            userId: process.env.USER_ID,
            resource: {
                raw: raw
            }
        });
        console.log("Mail Sent Successfully!");
    } catch (error) {
        console.error(error);
    }

}