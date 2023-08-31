const nodemailer = require('nodemailer');
const { promisify } = require('util');

const emailsender = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mnandacanada@gmail.com',
      pass: 'bcmwaydosfjjdmmf',
    },
  });

  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const mailOptions = {
    from: 'mnandacanada@gmail.com',
    to: email,
    subject: 'News360 password reset',
    text: 'your otp is ' + otp,
  };

  const sendMailPromise = promisify(transporter.sendMail.bind(transporter));

  try {
    await sendMailPromise(mailOptions);
    return { "code": 0, "otp": otp };
  } catch (error) {
    console.error('Error sending email:', error);
    return { "code": 1 };
  }
}

module.exports = emailsender;
