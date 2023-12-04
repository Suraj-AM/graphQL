import { ApolloServer, ApolloServerPlugin, BaseContext } from "@apollo/server";
import logger from './config/logger';
import typeDefs from './typeDefs';
import resolver from './resolvers';


const plugin: ApolloServerPlugin<BaseContext> = {
    async serverWillStart(_requestContext) {
        logger.info('Apollo server start!');
        return;
    },

    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart(requestContext:any) {
        logger.info(`method: ${requestContext.request.http?.body?.operationName}`)
        
        return {
            // Fires when request being to complete and sending to client.
            async willSendResponse({ response }: { response: any; }) {
                if ((response.body.kind = 'single') &&
                    (response.body.singleResult.errors?.[0]?.extensions?.status)
                ) {
                    // set http status
                    response.http.status = response.body.singleResult.errors[0].extensions.status;
                }

            }
        };
    },
};


// format error here
const ErrorFormatter = (error: any) => {
    delete error.locations;
    return error;
};

// Create apollo/GraphQL server
const graphQLServer = new ApolloServer({
    typeDefs: typeDefs,             // schema
    resolvers: resolver,            // resolvers
    plugins: [plugin],              // plugin ref: https://www.apollographql.com/docs/apollo-server/integrations/plugins
    formatError: ErrorFormatter     // error formatter
});



export default graphQLServer;