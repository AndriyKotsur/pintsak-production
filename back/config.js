require('dotenv').config();
module.exports = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    tokenKey: process.env.TOKEN_KEY,
    tokenExpires: process.env.TOKEN_EXPIRES,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailPort: process.env.MAIL_PORT
};