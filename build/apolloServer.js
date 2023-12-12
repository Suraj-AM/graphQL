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
const server_1 = require("@apollo/server");
const logger_1 = __importDefault(require("./config/logger"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const plugin = {
    serverWillStart(_requestContext) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Apollo server start!');
            return;
        });
    },
    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`method: ${(_b = (_a = requestContext.request.http) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.operationName}`);
            return {
                // Fires when request being to complete and sending to client.
                willSendResponse({ response }) {
                    var _a, _b, _c;
                    return __awaiter(this, void 0, void 0, function* () {
                        if ((response.body.kind = 'single') &&
                            ((_c = (_b = (_a = response.body.singleResult.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.extensions) === null || _c === void 0 ? void 0 : _c.status)) {
                            // set http status
                            response.http.status = response.body.singleResult.errors[0].extensions.status;
                        }
                    });
                }
            };
        });
    },
};
// format error here
const ErrorFormatter = (error) => {
    delete error.locations;
    return error;
};
// Create apollo/GraphQL server
const graphQLServer = new server_1.ApolloServer({
    typeDefs: typeDefs_1.default, // schema
    resolvers: resolvers_1.default, // resolvers
    plugins: [plugin], // plugin ref: https://www.apollographql.com/docs/apollo-server/integrations/plugins
    formatError: ErrorFormatter // error formatter
});
exports.default = graphQLServer;
