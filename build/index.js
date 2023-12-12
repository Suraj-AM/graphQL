"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express4_1 = require("@apollo/server/express4");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const apolloServer_1 = __importDefault(require("./apolloServer"));
const graphQl_authentication_1 = __importDefault(require("./middleware/graphQl.authentication"));
const config_1 = __importDefault(require("./config/config"));
const morgan_1 = __importDefault(require("./config/morgan"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create express ap
        const app = (0, express_1.default)();
        // JSON requests are received as plain text. We need to parse the json request body.
        app.use(express_1.default.json());
        // Parse urlencoded request body if provided with any of the requests
        app.use(express_1.default.urlencoded({ extended: true }));
        // Using gzip compression for faster transfer of response data
        app.use((0, compression_1.default)());
        // Enable cors to accept requests from any frontend domain, all possible HTTP methods, and necessary items in request headers
        app.use((0, cors_1.default)());
        app.options('*', (0, cors_1.default)());
        if (config_1.default.env !== 'test') {
            app.use(morgan_1.default.successHandler);
            app.use(morgan_1.default.errorHandler);
        }
        // Start apollo/GraphQL server
        yield apolloServer_1.default.start();
        // Configure GraphQL server to express server
        app.use('/graphql', (0, express4_1.expressMiddleware)(apolloServer_1.default, { context: graphQl_authentication_1.default }));
        // Set necessary HTTP headers for app security
        app.use((0, helmet_1.default)());
        mongoose_1.default.set("strictQuery", true);
        // Connect to MongoDB using mongoose
        mongoose_1.default.connect(config_1.default.mongoose.url, config_1.default.mongoose.options).then((_db) => {
            console.log("\x1b[36m%s\x1b[1m", "------------------------------------------------------");
            console.log("\x1b[36m%s\x1b[0m", `info: Connected to MongoDB => ${config_1.default.mongoose.url}`);
            app.listen(config_1.default.port, () => {
                console.log("\x1b[36m%s\x1b[0m", "------------------------------------------------------");
                console.log("\x1b[32m%s\x1b[0m", `info: Node server listening on port => ${config_1.default.port}`);
                console.log("\x1b[36m%s\x1b[0m", "------------------------------------------------------");
            });
        });
    });
}
startServer();
