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
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = (userBody) => user_model_1.default.create(userBody);
const getUserByEmail = (UserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: UserEmail });
    if (!user) {
        throw new Error('User not found!');
    }
    return user;
});
const getUserByMobile = (UserMobile) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ mobile: UserMobile });
    if (!user) {
        throw new Error('User not found!');
    }
    return user;
});
const getUserByID = (id) => user_model_1.default.findById(id);
const updateUserById = (userId, userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUserByID(userId);
    if (!user) {
        throw new Error('User not found');
    }
    Object.assign(user, userBody);
    yield user.save();
    return user;
});
const updatePassword = (userId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUserByID(userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.isPasswordMatch(body.oldPassword)) {
        throw new Error('Old password not matched');
    }
    return updateUserById(userId, { password: body.newPassword });
});
exports.default = { createUser, getUserByEmail, getUserByMobile, updateUserById, getUserByID, updatePassword };
