const nodemailer = require("nodemailer");
const { MAILTRAP_USER, MAILTRAP_PASSWORD, MAIL_FROM } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});

const sendEmail = async (message) => {
  const mail = { ...message, from: MAIL_FROM };
  await transport.sendMail(mail);
  return true;
};

module.exports = sendEmail;
