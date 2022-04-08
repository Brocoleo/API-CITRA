require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser:  process.env.DB_USER,
    dbPassword:  process.env.DB_PASSWORD,
    dbHost:  process.env.DB_HOST,
    dbName:  process.env.DB_NAME,
    dbPort:  process.env.DB_PORT,
    apiKey:  process.env.API_KEY,
    jwtSecret: process.env.SECRET_JWT,
    userNameGmail: process.env.SMTP_EMAIL,
    passwordGmail: process.env.SMTP_PASSWORD,
    accountIdTwilio: process.env.TWILIO_ID,
    tokenTwilio: process.env.TWILIO_TOKEN,
    numeroTwilio: process.env.NUMERO_TWILO,
    googleId: process.env.GOOGLE_ID,
    secretGoogle: process.env.GOOGLE_SECRET
}

module.exports = { config };
