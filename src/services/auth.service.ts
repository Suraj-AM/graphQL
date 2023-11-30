import { generatePassword } from "../utils/password";
import userService from "./user.service";
import socialAuthService from "./social.auth.service";
import { Document } from "mongoose";
import customGraphQLError from '../utils/errorHandler';

interface GoogleUser {
    name: string;
    email: string;
    email_verified: Boolean;
}

interface FacebookUser {
    name: string;
    email: string;
}

const registerUser = (userBody: Record<string, any>): Promise<Document> => userService.createUser(userBody);

const registerUserWithGoogle = async (idToken: string): Promise<Document> => {
    const googleUser: GoogleUser = await socialAuthService.verifyGoogleUser(idToken);
    const userBody = {
        name: googleUser.name,
        email: googleUser.email,
        mobile: null,
        password: generatePassword(),
    };
    return userService.createUser(userBody);
};

const registerUserWithFacebook = async (idToken: string): Promise<Document> => {
    const facebookUser: FacebookUser = await socialAuthService.verifyFacebookUser(idToken);
    const userBody = {
        name: facebookUser.name,
        email: facebookUser.email,
        mobile: null,
        password: generatePassword(),
    };
    return userService.createUser(userBody);
};

const loginUserWithEmailAndPassword = async (mobile: string, password: string): Promise<Document> => {
    const user = await userService.getUserByMobile(mobile);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new customGraphQLError(401, 'User email or password is incorrect', 'BAD_REQUEST');
    }
    return user;
};

const loginWithGoogle = async (idToken: string): Promise<Document> => {
    const googleUser: GoogleUser = await socialAuthService.verifyGoogleUser(idToken);
    if (!googleUser.email || !googleUser.email_verified) {
        throw new customGraphQLError(404, 'user not found!', 'NOT_FOUND');
    }
    const user = await userService.getUserByEmail(googleUser.email);
    if (!user) {
        throw new customGraphQLError(404 , 'User not found!','NOT_FOUND')
        
    }
    return user;
};

const loginWithFacebook = async (idToken: string): Promise<Document> => {
    const facebookUser: FacebookUser = await socialAuthService.verifyFacebookUser(idToken);
    const user = await userService.getUserByEmail(facebookUser.email);
    if (!user) {
        throw new customGraphQLError(404 , 'User not found!','NOT_FOUND')

    }
    return user;
};

const socialLogin = async (provider: string, idToken: string): Promise<Document> => {
    let user: Document;
    switch (provider) {
        case "google":
            user = await loginWithGoogle(idToken);
            break;
        case "facebook":
            user = await loginWithFacebook(idToken);
            break;
        default:
            throw new customGraphQLError(404 , `${provider} Provider Not Found`,'NOT_FOUND');
    }
    return user;
};

export default {
    registerUser,
    registerUserWithGoogle,
    registerUserWithFacebook,
    loginUserWithEmailAndPassword,
    socialLogin,
};
