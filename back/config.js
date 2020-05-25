require('dotenv').config();
module.exports = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    tokenKey: process.env.TOKEN_KEY,
    tokenExpires: process.env.TOKEN_EXPIRES,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailPort: process.env.MAIL_PORT
};