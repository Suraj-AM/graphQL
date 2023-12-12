"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
const softDelete = (schema) => {
    schema.plugin(mongoose_delete_1.default, { overrideMethods: ['count', 'countDocuments', 'find'] });
};
exports.default = softDelete;
