import { EMAIL } from "../config/env.js";
import { transporter } from "../config/nodemailer.js"
import { generateEmailTemplate } from "./email-template.js";


export const sendReminderEmail = async (email, subscription) => {
    try {
        const emailBody= await generateEmailTemplate(subscription);
        await transporter.sendMail({
            from: EMAIL,
            to: email.toString(), 
            subject: "Subscription Reminder", 
            html: emailBody
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};