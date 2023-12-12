"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../config/config"));
/**
 * Generate token
 * @param {string} userId
 * @param {moment.Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires) => {
    const secret = config_1.default.jwt.secret || '';
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix()
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} [secret]
 * @returns {string | object}
 */
const verifyToken = (token) => {
    const secret = config_1.default.jwt.secret || '';
    return jsonwebtoken_1.default.verify(token, secret);
};
/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Object}
 */
const generateAuthTokens = (user) => {
    const accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user._id, accessTokenExpires);
    return {
        token: accessToken,
        expires: accessTokenExpires.toDate()
    };
};
exports.default = { generateToken, verifyToken, generateAuthTokens };
