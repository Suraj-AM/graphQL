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
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const user_service_1 = __importDefault(require("../services/user.service"));
const token_service_1 = __importDefault(require("../services/token.service"));
const context = ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        // Check access token
        if (!token) {
            return {};
        }
        // If token exists, then verify
        const payload = token_service_1.default.verifyToken(token);
        // Get user
        const user = yield user_service_1.default.getUserByID(payload.sub);
        // If user deleted or not found
        if (!user) {
            throw new errorHandler_1.default(401, 'User is not authenticated', 'UNAUTHENTICATED');
        }
        // Set user in context
        return { user };
    }
    catch (err) {
        throw new errorHandler_1.default(500, err);
    }
});
exports.default = context;
