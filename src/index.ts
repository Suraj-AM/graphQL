import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './typeDefs';
import resolver from './resolvers';

async function startServer() {

    // Create express app
    const PORT = Number(process.env.PORT || 8080);
    const app = express();

    app.use(express.json());

    // Create apollo/GraphQL server
    const graphQLServer = new ApolloServer({
        typeDefs: typeDefs, // schema
        resolvers: resolver // resolvers
    });

    // Start apollo/GraphQL server
    await graphQLServer.start();

    // Configure GraphQL server to express server
    app.use('/graphql', expressMiddleware(graphQLServer));

    // Start express app 
    app.listen(PORT, () => console.log('server is running on port: ', PORT));

}

startServer();