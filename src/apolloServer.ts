import { ApolloServer, ApolloServerPlugin, BaseContext } from "@apollo/server";
import logger from './config/logger';
import typeDefs from './typeDefs';
import resolver from './resolvers';


const plugin: ApolloServerPlugin<BaseContext> = {
    async serverWillStart(_requestContext) {
        logger.info('Apollo server start!');
        return;
    },

    // // Fires whenever a GraphQL request is received from a client.
    // async requestDidStart(requestContext) {
    //     console.log('Request started!');

    //     return ;
    // },
};

const ErrorFormatter = (error: any) => {
    // console.log("error:",error);
    return {
        message: error.message,
        code: error.extensions.code || "INTERNAL_SERVER_ERROR",
        status: error.extensions.status || 500,
    };
};

// Create apollo/GraphQL server
const graphQLServer = new ApolloServer({
    typeDefs: typeDefs,             // schema
    resolvers: resolver,            // resolvers
    plugins: [plugin],              // plugin ref: https://www.apollographql.com/docs/apollo-server/integrations/plugins
    formatError: ErrorFormatter     // error formatter
});



export default graphQLServer;