import { userQuery, userMutation } from './user.resolver';

const resolvers = {
    Query: userQuery,
    Mutation: userMutation
};

export default resolvers; 