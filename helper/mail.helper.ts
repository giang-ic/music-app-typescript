import nodemailer  from "nodemailer";

export const sendMail = (toEmail: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_OTP,
          pass: process.env.PASSWORD_OTP
        }
      });
      
      const mailOptions = {
        from: process.env.EMAIL_OTP,
        to: toEmail, // receive email
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
} 