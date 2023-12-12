"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_typedefs_1 = require("./user.typedefs");
const typeDefs = `
    ${user_typedefs_1.userTypes}
    type Query {
        ${user_typedefs_1.userQuery}
    }
    type Mutation {
        ${user_typedefs_1.userMutation}
    }
`;
exports.default = typeDefs;
