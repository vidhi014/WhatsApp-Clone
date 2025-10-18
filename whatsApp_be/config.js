import dotenv from "dotenv";
import path from "path";


dotenv.config();

const config= {
  DBPORT: process.env.DB_PORT,
  DBHost: process.env.DB_HOST,
  DBUser: process.env.DB_USER,
  DBPassword: process.env.DB_PASSWORD,
  DBName: process.env.DB_NAME,
  DBURL:process.env.DB_URI,
  tokenkey: process.env.TOKEN_KEY,
  emailVerificationLink: process.env.EMAIL_VERIFICATION_LINK,
  resetPasswordLink: process.env.RESET_PASSWORD_LINK,
  tokenExpirationTime: process.env.TOKEN_EXPIRY_TIME,
  SMTPemailAddress: process.env.SMTP_EMAIL,
  SMTPPassword: process.env.SMTP_EMAIL_PASSWORD,
  SMTPSenderEmail: process.env.SMTP_SENDER_EMAIL,
  supportEmail: process.env.SUPPORT_EMAIL,
};

export default config;
