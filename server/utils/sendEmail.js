import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";

const sendEmail = async (email, text, uname, ulink) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    let __dirname = path.resolve();
    let emailTemplate;
    ejs
      .renderFile(path.join(__dirname, "views/index.ejs"), {
        name: uname,
        link: ulink,
      })
      .then(async (result) => {
        emailTemplate = result;

        await transporter.sendMail({
          from: process.env.USER,
          to: email,
          subject: "Travel The World - Change your Password",
          text: text,
          html: emailTemplate,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
