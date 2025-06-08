import nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer';
import { addMessage } from '../firebase/repositories/messages-repository';

interface sendMailProps {
    to: string
}

export function sendMail({ to }: sendMailProps) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions: Options = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Amora',
        text: 'Texto do corpo do e-mail',
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            addMessage({
                from: (mailOptions.from || '').toString(),
                to: (mailOptions.to || '').toString(),
                subject: mailOptions.subject,
                text: mailOptions.text?.toString(),
                error: error.toString()
            })
        } else {
            addMessage({
                from: (mailOptions.from || '').toString(),
                to: (mailOptions.to || '').toString(),
                subject: mailOptions.subject,
                text: mailOptions.text?.toString()
            })
        }
    });
}