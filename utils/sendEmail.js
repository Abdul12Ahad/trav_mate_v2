const nodemailer = require('nodemailer');
module.exports = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({ from: process.env.EMAIL, to, subject, text });
};