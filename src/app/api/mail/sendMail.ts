import nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer';
import { addMessage } from '../firebase/repositories/messages-repository';
import { addLog } from '../firebase/repositories/logs-repository';
import QRCode from 'qrcode'

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

    const url = "https://amorame.com.br/" + id

    const qrcode = await QRCode.toDataURL(url);

    const mailOptions: Options = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Amora',
        //text: 'Segue o link para acessar sua página: ' + 'https://amora-zeta.vercel.app/' + id,
        html: `
          <center>
            <h1 style="font-family: 'Arial', sans-serif; color: #E91E63;">Parabéns! 💕</h1>
            <p style="font-size: 16px; color: #555;">Sua página especial de casal já está no ar!</p>
          </center>

          <div style="text-align: center; margin: 30px 0;">
            <img src="${qrcode} alt="QR Code do Casal" width="150" style="margin-bottom: 15px;" />
            <p style="font-size: 16px;">Escaneie o QR Code ou clique no botão abaixo para acessar sua página de amor</strong>.</p>
            <a href="${url}" style="display: inline-block; margin-top: 10px; background-color: #E91E63; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px;">✨ Ver nossa página ✨</a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee;" />
          <div style="font-family: 'Arial', sans-serif; color: #666; padding: 20px;">
            <p>O amor de vocês agora tem um cantinho só dele. 💘</p>
            <p>Compartilhem esse link com quem quiserem, guardem como lembrança e deixem o sentimento crescer um pouquinho mais todos os dias. 🌷</p>
            <p style="margin-top: 20px;">Com carinho,<br><strong>Equipe Amora 💖</strong></p>
          </div>


          <center style="font-size: 12px; color: #aaa; margin-top: 30px;">
            Você recebeu este e-mail porque ativou uma página no Amora.<br>
            <a href="https://amorame.com.br/termos-de-uso" style="color: #aaa;">Política de Privacidade</a> • 
            <a href="mailto:contato@appamora.com" style="color: #aaa;">Contato</a>
          </center>
        `
    };

    const info = await transporter.sendMail(mailOptions);

    await addMessage({
        from: mailOptions.from?.toString(),
        to: mailOptions.to?.toString(),
        text: mailOptions.text?.toString()
    })

    await addLog({ message: JSON.stringify(info) })
}