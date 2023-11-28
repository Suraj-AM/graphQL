const userTypes = `
    type createUserResponse { 
        _id:ID
    }
    type loginUserResponse {
        accessToken:String!
    }
    `;
    
const userQuery = `
    hello:String
    loginUser(mobile:String!, password:String!):loginUserResponse
    `;


const userMutation = `
    createUser(name:String!, email:String!, mobile:String!, password:String!):createUserResponse
    `;

export { userQuery, userMutation, userTypes };