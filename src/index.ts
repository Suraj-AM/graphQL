import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import graphQLServer from './apolloServer';


async function startServer() {

    // Create express app
    const PORT = Number(process.env.PORT || 8080);
    const app = express();

    app.use(express.json());



    // Start apollo/GraphQL server
    await graphQLServer.start();

    // Configure GraphQL server to express server
    app.use('/graphql', expressMiddleware(graphQLServer));

    // Start express app 
    app.listen(PORT, () => console.log('server is running on port: ', PORT));

}

startServer();