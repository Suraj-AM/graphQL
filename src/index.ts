import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import graphQLServer from './apolloServer';
import env from './config/config';
import logger from './config/logger';
import morgan from './config/morgan';


async function startServer() {

    // Create express ap
    const app = express();

    app.use(express.json());
    // Set necessary HTTP headers for app security
    app.use(helmet());

    // JSON requests are received as plain text. We need to parse the json request body.
    app.use(express.json());

    // Parse urlencoded request body if provided with any of the requests
    app.use(express.urlencoded({ extended: true }));

    // Using gzip compression for faster transfer of response data
    app.use(compression());

    // Enable cors to accept requests from any frontend domain, all possible HTTP methods, and necessary items in request headers
    app.use(cors());
    app.options('*', cors());

    if (env.env !== 'test') {
        app.use(morgan.successHandler);
        app.use(morgan.errorHandler);
    }



    // Start apollo/GraphQL server
    await graphQLServer.start();

    // Configure GraphQL server to express server
    app.use('/graphql', expressMiddleware(graphQLServer));

    // Start express app 
    app.listen(env.port, () => logger.info(`server is running on port: ${env.port}`));

}

startServer();