import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import { Document } from "mongoose";

/**
 * Generate token
 * @param {string} userId
 * @param {moment.Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId: string, expires: moment.Moment): string => {
  const secret: string = config.jwt.secret || ''
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix()
  };
  return jwt.sign(payload, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} [secret]
 * @returns {string | object}
 */
const verifyToken = (token: string): string | object => {
  const secret: string = config.jwt.secret || ''
  return jwt.verify(token, secret);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Object}
 */
const generateAuthTokens = (user: Document): { token: string; expires: Date } => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user._id, accessTokenExpires);

  return {
    token: accessToken,
    expires: accessTokenExpires.toDate()
  };
};

export  default { generateToken, verifyToken, generateAuthTokens };
