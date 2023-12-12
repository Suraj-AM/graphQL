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
exports.userMutation = exports.userQuery = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const catchAsyncGraphQL_1 = __importDefault(require("../utils/catchAsyncGraphQL"));
const token_service_1 = __importDefault(require("../services/token.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const userQuery = {
    hello: (_, args, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
        return 'Hey their Server is up' + JSON.stringify(contextValue);
    }),
    loginUser: (0, catchAsyncGraphQL_1.default)((_, args, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
        const { mobile, password } = args;
        const user = yield auth_service_1.default.loginUserWithEmailAndPassword(mobile, password);
        const { token, expires } = token_service_1.default.generateAuthTokens(user);
        return { "accessToken": token };
    })),
    getUser: (0, catchAsyncGraphQL_1.default)((_, args, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
        if (!contextValue.user) {
            throw new errorHandler_1.default(401, "Please add access token!", "UNAUTHORIZED");
        }
        const userID = args.userID;
        if (!userID) {
            throw new errorHandler_1.default(401, "please provide user id", 'NOT_FOUND');
        }
        const user = user_service_1.default.getUserByID(userID);
        return user;
    }))
};
exports.userQuery = userQuery;
const userMutation = {
    createUser: (0, catchAsyncGraphQL_1.default)((_, args, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.default.createUser({ name: args.name, email: args.email, mobile: args.mobile, password: args.password });
        return { _id: user._id };
    }))
};
exports.userMutation = userMutation;
