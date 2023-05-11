require('dotenv').config();

module.exports = {
    JWT_SECRET: 'thisIsASimpleTest',
    OTP_LENGTH: 10,
    OTP_CONFIG: {
        upperCaseAlphabets: false,
        specialChars: false,
    },
    MAIL_SETTINGS: {
        service: 'gmail',
        auth: {
            user: "codingclubdsa@gmail.com",
            pass: "imfulisldkgyzhzq",
        },

    }
};
