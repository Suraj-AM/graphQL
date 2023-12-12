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
const asyncGraphQLRequest = (fn) => (resolve, parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield fn(resolve, parent, args, context, info);
    }
    catch (err) {
        if (err instanceof errorHandler_1.default) {
            throw err;
        }
        throw new errorHandler_1.default(500, err);
    }
});
exports.default = asyncGraphQLRequest;
