import nodemailer from 'nodemailer';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: './.env',
});

const replaceContent = (content, creds) => {
    let allkeysArr = Object.keys(creds);
    allkeysArr.forEach(function (key) {
        content = content.replace(`#{${key}}`, creds[key]);
    })

    return content;
}
const EmailHelper = async(templateName, subject, reciverEmail, creds) => {
    try {
        const templatePath = path.join(__dirname, "email_templates", templateName);
        let content = await fs.promises.readFile(templatePath, "utf-8");
        const emailDetails = {
            to: reciverEmail,
            from: 'prem.23bcs10060@sst.scaler.com',
            subject: subject,
            text: `Hi ${creds.name} this your reset otp ${creds.otp}`,
            html: replaceContent(content, creds),
        }
        const transportDetails = {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                password: process.env.EMAIL_PASSWORD
            }
        }

        const transporter = nodemailer.createTransport(transportDetails);
        await transporter.sendMail((emailDetails))
        console.log("email sent")
    } catch (err) {
        console.log(err)
    }

}

export default EmailHelper