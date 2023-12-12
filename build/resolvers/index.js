"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_resolver_1 = require("./user.resolver");
const resolvers = {
    Query: user_resolver_1.userQuery,
    Mutation: user_resolver_1.userMutation
};
exports.default = resolvers;
