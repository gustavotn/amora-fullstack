import nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer';
import { addMessage } from '../firebase/repositories/messages-repository';
import { addLog } from '../firebase/repositories/logs-repository';

interface sendMailProps {
    to: string,
    id: string
}

export async function sendMail({ to, id }: sendMailProps) {
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
        text: 'Segue o link para acessar sua página: ' + process.env.NEXT_PUBLIC_URL + '/' + id,
    };

    const info = await transporter.sendMail(mailOptions);

    await addMessage({
        from: mailOptions.from?.toString(),
        to: mailOptions.to?.toString(),
        text: mailOptions.text?.toString()
    })

    await addLog({ message: JSON.stringify(info) })
}