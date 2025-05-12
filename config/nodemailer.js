import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PASSWORD } from './env.js';

export const transporter = nodemailer.createTransport({
    //Here we setup the nodemailer module to send the email from our account
    service:"gmail",
    auth:{
        user:EMAIL,
        pass:EMAIL_PASSWORD
    }
});