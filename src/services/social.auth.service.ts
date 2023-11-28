import { OAuth2Client } from 'google-auth-library';
import axios, { AxiosResponse } from 'axios';
import config from '../config/config';

interface GoogleUser {
    // Define your GoogleUser interface based on the expected structure
    // For example:
    // id: string;
    name: string;
    email: string;
    email_verified:Boolean;
    // Add other necessary fields
}

interface FacebookUser {
    // Define your FacebookUser interface based on the expected structure
    // For example:
    // id: string;
    name: string;
    email: string;
    // Add other necessary fields
}

/**
 * Verify Google user using token.
 * @param {string} idToken - Google token.
 * @returns {Promise<GoogleUser>} - Google user information.
 */
const verifyGoogleUser = async (idToken: string): Promise<GoogleUser> => {
    const oAuth2Client = new OAuth2Client(config.socialLogin.google.clientId);
    const ticket = await oAuth2Client.verifyIdToken({
        idToken,
        audience: config.socialLogin.google.clientId,
    });
    const user: GoogleUser = ticket.getPayload() as GoogleUser;
    return user;
};

/**
 * Verify Facebook user using token.
 * @param {string} idToken - Facebook token.
 * @returns {Promise<FacebookUser>} - Facebook user information.
 */
const verifyFacebookUser = async (idToken: string): Promise<FacebookUser & any> => {
    try {
      const response = await axios.get(`https://graph.facebook.com/me?access_token=${idToken}&fields=id,name,email`);
      
      if (!response.data) {
        throw new Error('Invalid Facebook session');
      }
  
      return response.data as FacebookUser;
    } catch (error) {

    }
  };
  

export default { verifyGoogleUser, verifyFacebookUser };
