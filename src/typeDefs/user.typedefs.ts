const userQuery = `
hello:String
`;

const userTypes = `
type createUserResponse { 
    _id:ID
}
`;

const userMutation = `
createUser(name:String!, email:String!, mobile:String!, password:String!):createUserResponse
`;

export { userQuery, userMutation, userTypes };