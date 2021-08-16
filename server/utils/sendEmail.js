import nodemailer from "nodemailer";

const sendEmail = async (email, text) => {
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

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Travel The World - Change your Password",
      text: text,
      // html: ,
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
