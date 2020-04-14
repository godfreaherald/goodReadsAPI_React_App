const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
const mailer = {};

mailer.sendConfirmationEmail = function (user) {
  console.log("user:::" + user);
  const from = "Goline <info@goline.co.ke>";
  console.log("user:::" + user);
  console.log(process.env.EMAIL_HOST);
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Goline",
    text: `Welcome to Goline, to confirm your account click on this link ${user.generateConfirmationURL()}`
  };

  transport.sendMail(email);
};

mailer.sendResetPasswordEmail = function (user) {
  const from = "Goline <info@goline.co.ke>";

  const email = {
    from,
    to: user.email,
    subject: "Password Reset Link",
    text: `To reset your password click on this link ${user.generateResetPasswordURL()}`
  };

  transport.sendMail(email);
};

module.exports = mailer;
