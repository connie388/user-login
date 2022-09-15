var nodemailer = require("nodemailer");
const MailGen = require("mailgen");
require("dotenv").config();

const mailGenerator = new MailGen({
  theme: "default",
  product: {
    name: "The ZONE",
    link: process.env.BASE_URL,
    logo: process.env.LOGO,
  },
});

// The following youtube guides to generate app password for google mail
// https://www.youtube.com/watch?v=J4CtP1MBtOE
let transporter = nodemailer.createTransport({
  // host: process.env.EMAIL_HOST,
  // port: process.env.EMAIL_PORT,
  service: process.env.EMAIL_SERVICE,
  // secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = (email, subject, message) => {
  // Generate an HTML email with the provided contents
  var emailBody = mailGenerator.generate(message);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  var emailText = mailGenerator.generatePlaintext(message);

  // save the html and txt file to testing
  require("fs").writeFileSync("preview.html", emailBody, "utf8");
  require("fs").writeFileSync("preview.txt", emailText, "utf8");
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: subject,
    html: emailBody,
    text: emailText,
  };

  transporter.sendMail(msg, (error, info) => {
    if (error) {
      console.log(error);
      throw new Error(`System error: ${error.message}`);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
