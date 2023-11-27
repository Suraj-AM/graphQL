import { userQuery, userMutation } from './user.typedefs';

const typeDefs = `
    type Query {
        ${userQuery}
    }
    type Mutation {
        ${userMutation}
    }
`;

export default typeDefs;