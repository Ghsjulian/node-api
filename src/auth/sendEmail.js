const nodemailer = require("nodemailer");
const { secretKey, expiresIn, email_key, email_address } = require("./config");

const sendEmail = async (userName, userEmail, otp) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: email_address,
            pass: email_key
        }
    });

    // Define the email options
    let mailOptions = {
        from: email_address,
        to: userEmail,
        subject: "Please Verify Your Email Address",
        text: "OTP Verification Code",
        html: `<p>Hello, <b style="color:red">${userName}</b> Congratulations!</p><br/>
            <p>Please Verify Your Email , The Verification Link Will Be Expired In 5 Minutes.<br/>
            To Verify The Email Address And Complete Your Registration.</p><br><br>
            <center><strong style="padding:0.5rem 0.8rem;text-decoration:none; background:blue;color:#ffffff;border-radius:8px">${otp}</strong></center>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log(info);
            return true;
        }
    });
};


module.exports = sendEmail