require("dotenv").config();
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const config = require("./config.js");
const OAuth2 = google.auth.OAuth2;
var seneca = require("seneca")();

console.log(seneca.tag);

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);

OAuth2_client.setCredentials({refresh_token: config.refreshToken});

seneca.use("mail", {
  mail: {
    from: `THE SANTU <${config.user}>`,
  },
  config: {
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      // accessToken: accessToken,
    },
  },
});

// seneca.use("seneca-mail-dbtemplate");

seneca.ready(function (err) {
  console.log("ola");
  if (err) return console.log(err);

  seneca.act({
    role: "mail",
    cmd: "send",
    code: "welcome",
    to: "santraazyadav196@gmail.com",
    subject: "Welcome!",
  });
});

// app.post("/mail", (req, res) => {
//   const {email, subject, text} = req.query;
//   res.json({email, subject, text});
//   const accessToken = OAuth2_client.getAccessToken();
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: config.user,
//       clientId: config.clientId,
//       clientSecret: config.clientSecret,
//       refreshToken: config.refreshToken,
//       accessToken: accessToken,
//     },
//   });
//   const options = {
//     from: `THE SANTU <${config.user}>`,
//     to: email,
//     subject: subject,
//     text: text,
//   };
//   transporter.sendMail(options, (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Email sent :" + info.response);
//     }
//     transporter.close();
//   });
// });

// function sendMail(name, recipient) {
//   const accessToken = OAuth2_client.getAccessToken();
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: config.user,
//       clientId: config.clientId,
//       clientSecret: config.clientSecret,
//       refreshToken: config.refreshToken,
//       accessToken: accessToken,
//     },
//   });
//   const options = {
//     from: `The MAil <${config.user}>`,
//     to: recipient,
//     subject: "testing nodemailer",
//     text: "Hello world?",
//   };
//   transporter.sendMail(options, (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Email sent :" + info.response);
//     }
//     transporter.close();
//   });
// }

// sendMail("santu", "santraazyadav196@gmail.com");

app.listen(3000, () => {
  console.log("App is running on port 3000!");
});
