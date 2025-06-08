import nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer';
import { addMessage } from '../firebase/repositories/messages-repository';
import { addLog } from '../firebase/repositories/logs-repository';

interface sendMailProps {
    to: string
}

export async function sendMail({ to }: sendMailProps) {
    await addLog({ message: 'passou aqui 1 ', error: false })
    await addLog({ message: 'passou aqui 2 ' + process.env.EMAIL_USER + ' - ' + process.env.EMAIL_PASS, error: false })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await addLog({ message: 'passou aqui 3 ', error: false })

    const mailOptions: Options = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Amora',
        text: 'Texto do corpo do e-mail',
    };

    await addLog({ message: 'passou aqui 4 ', error: false })

    var errorMail = '';

    transporter.sendMail(mailOptions, (error, info) => {
        errorMail = error ? error.message : ''
    });

    await addLog({ message: errorMail ? errorMail : '', error: !!errorMail })
}