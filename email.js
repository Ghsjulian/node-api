// nodemailer-gmail-example.js

// Import the nodemailer module
const nodemailer = require('nodemailer');

// Create a transporter object
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'ghsjulian@gmail.com',
    pass: 'ukbr lotx akke xtkx'
  }
});

// Define the email options
let mailOptions = {
  from: 'ghsjulian@gmail.com',
  to: 'ghs.julian@yandex.com',
  subject: 'Hello from Node.js!',
  text: 'Hello from Node.js!',
  html: '<b>Hello from Node.js!</b>'
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
