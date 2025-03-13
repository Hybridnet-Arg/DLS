const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'c1391833.ferozo.com', // Cambia esto por la dirección del servidor SMTP
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: true,
    });

    const { destinatario, asunto, mensaje } = req.body;

    const mailOptions = {
      from: 'noreply@dms.dls-archer.com',
      to: destinatario,
      subject: asunto,
      text: mensaje,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ mensaje: 'Correo enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al enviar el correo' });
  }
}
