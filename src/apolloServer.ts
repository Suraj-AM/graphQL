import { ApolloServer } from "@apollo/server";
import { ApolloServerPlugin } from "@apollo/server/dist/esm/externalTypes/plugins";

import typeDefs from './typeDefs';
import resolver from './resolvers';

type BaseContext = {};

const plugin : ApolloServerPlugin<BaseContext> = {
    async serverWillStart(requestContext) {
        console.log('Apollo server start!');
        return;
    },
    
    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart(requestContext) {
        console.log('Request started!');

        return ;
    },
};

// Create apollo/GraphQL server
const graphQLServer = new ApolloServer({
    typeDefs: typeDefs,     // schema
    resolvers: resolver,    // resolvers
    plugins: [plugin],
});



export default graphQLServer;