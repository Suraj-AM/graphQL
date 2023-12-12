"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const envVars = process.env;
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    siteUrl: envVars.SITE_URL,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        options: {},
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        userInviteExpirationMinutes: envVars.JWT_INVITE_USER_EXPIRATION_MINUTES,
    },
    socialLogin: {
        google: {
            clientId: envVars.GOOGLE_CLIENT_ID,
        },
        facebook: {
            clientId: envVars.FACEBOOK_APP_ID,
        },
    },
    reCaptcha: {
        secret: envVars.GOOGLE_RECAPTCHA_SECRET,
    },
    email: {
        provider: envVars.EMAIL_PROVIDER, // sendgrid, aws, nodemailer
        key: envVars.EMAIL_PROVIDER_KEY, // For sendgrid and aws
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
};
exports.default = config;
