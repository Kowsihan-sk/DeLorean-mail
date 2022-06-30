import { scheduleJob } from "node-schedule";
import Mail from "../models/mail.js";
import { send_mail } from "../utils/sendMail.js";

scheduleJob('0 0 * * *', async () => {
    try {
        let today = new Date();
        let offset = today.getTimezoneOffset();
        today = new Date(today.getTime() - offset * 60 * 1000 + 9 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString().split("T")[0];
        // console.log(today);
        let mails = await Mail.find({ deliverDate: today });

        if (Array.isArray(mails)) {
            mails.map(mail => {
                send_mail(mail.email, mail.subject, mail.body, today.toString().split("-").reverse().join("-"));
            })
        }

        mails = await Mail.deleteMany({ deliverDate: today });

        console.log("today's mail sent and deleted if/any from database successfully");
    } catch (error) {
        console.error(error);
    }
})

export const createMail = async (req, res) => {
    // console.log(req.body);
    try {
        const mail = await new Mail(req.body);
        mail.save();

        // res.status(200).json("mail added to database successfully");
        res.status(200).redirect("/");

    } catch (error) {
        res.status(500).json(error);
    }
}

export const sendMail = async (req, res) => {
    try {
        let today = new Date();
        let offset = today.getTimezoneOffset();
        today = new Date(today.getTime() - offset * 60 * 1000 + 9 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString().split("T")[0];
        // console.log(today);

        const mails = await Mail.find({ deliverDate: today });

        if (Array.isArray(mails)) {
            mails.map(mail => {
                send_mail(mail.email, mail.subject, mail.body, today.toString().split("-").reverse().join("-"));
            })
        }

        await Mail.deleteMany({ deliverDate: today });

        res.status(200).json("today's mail sent and deleted if/any from database successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}