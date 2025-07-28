import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendMail = async ({ mailFrom, mailTo, subject, body }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject,
      html: body,
    })

    console.log('Email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Email sending failed:', error.message)
  }
}
