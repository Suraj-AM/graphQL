"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypes = exports.userMutation = exports.userQuery = void 0;
const userTypes = `
    type createUserResponse { 
        _id:ID
    }
    type loginUserResponse {
        accessToken:String!
    }
    type getUserResponse {
        name:String
        email:String
        mobile:String
        deleted:String
        _id:String
        _v:String
    }
    `;
exports.userTypes = userTypes;
const userQuery = `
    hello:String
    loginUser(mobile:String!, password:String!):loginUserResponse
    getUser(userID:String):getUserResponse
    `;
exports.userQuery = userQuery;
const userMutation = `
    createUser(name:String!, email:String!, mobile:String!, password:String!):createUserResponse
    `;
exports.userMutation = userMutation;
