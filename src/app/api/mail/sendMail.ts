import nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer';

interface sendMailProps {
    to: string
}

export function sendMail({ to } : sendMailProps ) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions : Options = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Amora',
        text: 'Texto do corpo do e-mail',
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Erro: ' + error);
        } else {
            console.log('E-mail enviado: ' + info.response);
        }
    });
}