"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
/**
 * Verify Google user using token.
 * @param {string} idToken - Google token.
 * @returns {Promise<GoogleUser>} - Google user information.
 */
const verifyGoogleUser = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    const oAuth2Client = new google_auth_library_1.OAuth2Client(config_1.default.socialLogin.google.clientId);
    const ticket = yield oAuth2Client.verifyIdToken({
        idToken,
        audience: config_1.default.socialLogin.google.clientId,
    });
    const user = ticket.getPayload();
    return user;
});
/**
 * Verify Facebook user using token.
 * @param {string} idToken - Facebook token.
 * @returns {Promise<FacebookUser>} - Facebook user information.
 */
const verifyFacebookUser = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://graph.facebook.com/me?access_token=${idToken}&fields=id,name,email`);
        if (!response.data) {
            throw new Error('Invalid Facebook session');
        }
        return response.data;
    }
    catch (error) {
    }
});
exports.default = { verifyGoogleUser, verifyFacebookUser };
