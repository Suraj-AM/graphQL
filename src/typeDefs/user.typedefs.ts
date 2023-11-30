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
    
const userQuery = `
    hello:String
    loginUser(mobile:String!, password:String!):loginUserResponse
    getUser(userID:String):getUserResponse
    `;


const userMutation = `
    createUser(name:String!, email:String!, mobile:String!, password:String!):createUserResponse
    `;

export { userQuery, userMutation, userTypes };