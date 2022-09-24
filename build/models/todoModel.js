"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const todoSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    kind: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "User",
    },
});
module.exports = mongoose_1.default.model("Todo", todoSchema);
