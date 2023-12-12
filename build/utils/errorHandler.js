"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class customGraphQLError extends graphql_1.GraphQLError {
    constructor(status, message, code) {
        super(message);
        this.message = message || "something went wrong!";
        this.extensions = {
            code: code || 'INTERNAL_SERVER_ERROR',
            status: status || 500
        };
    }
}
exports.default = customGraphQLError;
