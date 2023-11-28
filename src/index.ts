import express from 'express';
import mongoose from "mongoose";
import { expressMiddleware } from '@apollo/server/express4';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import graphQLServer from './apolloServer';
import authContext from './middleware/graphQl.authentication';
import config from './config/config';
import morgan from './config/morgan';


async function startServer() {

    // Create express ap
    const app = express();


    // JSON requests are received as plain text. We need to parse the json request body.
    app.use(express.json());

    // Parse urlencoded request body if provided with any of the requests
    app.use(express.urlencoded({ extended: true }));

    // Using gzip compression for faster transfer of response data
    app.use(compression());

    // Enable cors to accept requests from any frontend domain, all possible HTTP methods, and necessary items in request headers
    app.use(cors());
    app.options('*', cors());

    if (config.env !== 'test') {
        app.use(morgan.successHandler);
        app.use(morgan.errorHandler);
    }



    // Start apollo/GraphQL server
    await graphQLServer.start();

    // Configure GraphQL server to express server
    app.use('/graphql', expressMiddleware(graphQLServer, { context: authContext }));

    // Set necessary HTTP headers for app security
    app.use(helmet());

    mongoose.set("strictQuery", true);

    // Connect to MongoDB using mongoose
    mongoose.connect(config.mongoose.url, config.mongoose.options).then((_db) => {
        console.log("\x1b[36m%s\x1b[1m", "------------------------------------------------------");
        console.log("\x1b[36m%s\x1b[0m", `info: Connected to MongoDB => ${config.mongoose.url}`);
        app.listen(config.port, () => {
            console.log("\x1b[36m%s\x1b[0m", "------------------------------------------------------");
            console.log("\x1b[32m%s\x1b[0m", `info: Node server listening on port => ${config.port}`);
            console.log("\x1b[36m%s\x1b[0m", "------------------------------------------------------");
        });
    });

}

startServer();