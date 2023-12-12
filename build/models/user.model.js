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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const private_plugin_1 = __importDefault(require("./plugins/private.plugin"));
const softDelete_plugin_1 = __importDefault(require("./plugins/softDelete.plugin"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error("Invalid email");
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
        minlength: 6,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error("Password must contain at least one letter and one number");
            }
        },
    },
});
// Define methods for the User schema
userSchema.methods.isPasswordMatch = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return bcrypt_1.default.compare(password, user.password);
    });
};
// Define middleware for pre-save hook
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcrypt_1.default.hash(user.password, 8);
        }
        next();
    });
});
// Apply plugins for the schema (if available)
userSchema.plugin(private_plugin_1.default);
userSchema.plugin(softDelete_plugin_1.default);
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
