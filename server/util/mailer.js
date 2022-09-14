var nodemailer = require("nodemailer");
const MailGen = require("mailgen");
// const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const mailGenerator = new MailGen({
  theme: "default",
  product: {
    name: "The ZONE",
    link: process.env.BASE_URL,
    logo: process.env.LOGO,
  },
});

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// let transporter = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//         user: "<user>",
//         pass: "<pass>"
//     }
// })

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

  // transporter
  //   .sendMail(msg)
  //   .then(() => {
  //     return res.status(200).json({
  //       success: true,
  //       message: "you should receive an email from us",
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     return res.status(500).json({ success: false, message: "System error." });
  //   });

  //   OR
  //
  //   try {
  //      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //      return sgMail.send(msg);
  //   } catch (error) {
  //     return res.status(500).json({ success: false, message: `System error ${error.message}` });
  //   }
};

module.exports = sendMail;
