require("dotenv").config();
const {request} = require("express");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

app.use(express.json());

// const posts = [
//   {username: "santu", tittle: "post1"},
//   {username: "sant", tittle: "post2"},
// ];

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// app.get("/posts", authenticateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.name));
//   //   res.json(posts);
// });

// app.post("/login", (req, res) => {
//   const {username} = req.body;
//   const user = {name: username};
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({accessToken: accessToken});
// });

app.post("/mail", (req, res) => {
  // const {email, password} = req.body;
  // res.json(req.body);
  const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: "santraazyadav196@gmail.com",
      pass: "Santu$1992",
    },
  });
  const options = {
    from: "santraazyadav196@gmail.com",
    to: "santrajyadav196@gmail.com",
    subject: "testing nodemailer",
    text: "Hello world?",
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent :" + info.response);
    }
  });
});

// const tranporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: true,
//   auth: {
//     user: "santraazyadav196@gmail.com",
//     pass: "Santu$1992",
//   },
// });

// async function run() {
//   let sendResult = await tranporter.sendMail({
//     from: "santraazyadav196@gmail.com",
//     to: "santrajyadav196@gmail.com",
//     subject: "testing nodemailer",
//     text: "Hello world?",
//   });
//   console.log(sendResult);
// }

// run().catch((err) => console.error(err));

app.listen(3000, () => {
  console.log("App is running on port 3000!");
});
