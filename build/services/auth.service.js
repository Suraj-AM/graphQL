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
const password_1 = require("../utils/password");
const user_service_1 = __importDefault(require("./user.service"));
const social_auth_service_1 = __importDefault(require("./social.auth.service"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const registerUser = (userBody) => user_service_1.default.createUser(userBody);
const registerUserWithGoogle = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    const googleUser = yield social_auth_service_1.default.verifyGoogleUser(idToken);
    const userBody = {
        name: googleUser.name,
        email: googleUser.email,
        mobile: null,
        password: (0, password_1.generatePassword)(),
    };
    return user_service_1.default.createUser(userBody);
});
const registerUserWithFacebook = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    const facebookUser = yield social_auth_service_1.default.verifyFacebookUser(idToken);
    const userBody = {
        name: facebookUser.name,
        email: facebookUser.email,
        mobile: null,
        password: (0, password_1.generatePassword)(),
    };
    return user_service_1.default.createUser(userBody);
});
const loginUserWithEmailAndPassword = (mobile, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.default.getUserByMobile(mobile);
    if (!user || !(yield user.isPasswordMatch(password))) {
        throw new errorHandler_1.default(401, 'User email or password is incorrect', 'BAD_REQUEST');
    }
    return user;
});
const loginWithGoogle = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    const googleUser = yield social_auth_service_1.default.verifyGoogleUser(idToken);
    if (!googleUser.email || !googleUser.email_verified) {
        throw new errorHandler_1.default(404, 'user not found!', 'NOT_FOUND');
    }
    const user = yield user_service_1.default.getUserByEmail(googleUser.email);
    if (!user) {
        throw new errorHandler_1.default(404, 'User not found!', 'NOT_FOUND');
    }
    return user;
});
const loginWithFacebook = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    const facebookUser = yield social_auth_service_1.default.verifyFacebookUser(idToken);
    const user = yield user_service_1.default.getUserByEmail(facebookUser.email);
    if (!user) {
        throw new errorHandler_1.default(404, 'User not found!', 'NOT_FOUND');
    }
    return user;
});
const socialLogin = (provider, idToken) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    switch (provider) {
        case "google":
            user = yield loginWithGoogle(idToken);
            break;
        case "facebook":
            user = yield loginWithFacebook(idToken);
            break;
        default:
            throw new errorHandler_1.default(404, `${provider} Provider Not Found`, 'NOT_FOUND');
    }
    return user;
});
exports.default = {
    registerUser,
    registerUserWithGoogle,
    registerUserWithFacebook,
    loginUserWithEmailAndPassword,
    socialLogin,
};
