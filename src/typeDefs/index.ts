import { userQuery, userMutation, userTypes } from './user.typedefs';

const typeDefs = `
    ${userTypes}
    type Query {
        ${userQuery}
    }
    type Mutation {
        ${userMutation}
    }
`;

export default typeDefs;